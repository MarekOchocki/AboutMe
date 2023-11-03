import { AssemblyMachine3Entity } from "../entity-models/assembly-machine-3.model";
import { BeaconEntity } from "../entity-models/beacon.model";
import { LogisticChestPassiveProviderEntity } from "../entity-models/logistic-chest-passive-provider.model";
import { LogisticChestRequesterEntity, RequestFilterArray } from "../entity-models/logistic-chest-requester.model";
import { MediumElectricPoleEntity } from "../entity-models/medium-electric-pole.model";
import { RoboportEntity } from "../entity-models/roboport.model";
import { StackInserterEntity } from "../entity-models/stack-inserter.model";
import { EntityDirection } from "../entity-properties/direction.enum";
import { EntityPosition } from "../entity-properties/position.model";
import { Blueprint } from "./blueprint";
import * as recipeList from "../data/recipes.json";
import { FactorioRecipesList } from "../data/recipe.model";
import { LogisticChestActiveProviderEntity } from "../entity-models/logistic-chest-active-provider.model";


export class BlueprintRequirement {
  constructor(public recipeName: string, public craftingSpeed: number) { }
}

class MachinesRequirement {
  constructor(public recipeName: string, public amount: number) { }
}


export class EndgameGenerator {
  recipes: FactorioRecipesList;
  readonly secondsOfIngredientsBufferedInChest = 10;
  machinesRequirements: MachinesRequirement[] = [];

  public constructor() {
    this.recipes = recipeList as FactorioRecipesList;
  }

  public createFromRequirements(requirements: BlueprintRequirement[], widthInBeacons: number): Blueprint {
    const filteredRequirements = requirements.filter(r => {
      return this.recipes[r.recipeName] && (
        this.recipes[r.recipeName].category === 'crafting' ||
        this.recipes[r.recipeName].category === "crafting-with-fluid"
      );
    });
    if(filteredRequirements.length !== requirements.length) {
      console.warn("some requirements for blueprint generation requires machines that are not supported");
    };
    console.log({requirements, filteredRequirements});

    this.machinesRequirements = this.convertToMachinesNeeded(filteredRequirements);
    const numberOfProductionRows = this.getNumberOfProductionRowsNeeded(widthInBeacons, this.machinesRequirements);
    const numberOfRows = numberOfProductionRows + this.getNumberOfRoboportRowsNeeded(numberOfProductionRows);
    const entities: any[] = this.generateRowsOfElectricPoles(widthInBeacons, numberOfRows+1);
    entities.push(...this.generateRowsOfBeacons(widthInBeacons, numberOfRows+1, entities.length + 1));

    for(let row = 0; row < numberOfRows; row++) {
      if(this.shouldRowContainRoboports(numberOfRows, row)) {
        entities.push(...this.generateRowOfRoboports(widthInBeacons, row, entities.length + 1));
      } else {
        entities.push(...this.generateRowOfAssemblyMachines(widthInBeacons, row, entities.length + 1));
      }
    }

    return new Blueprint(entities);
  }

  private convertToMachinesNeeded(requirements: BlueprintRequirement[]): MachinesRequirement[] {
    return requirements.map(req => {
      let numberOfMachines = Math.ceil(req.craftingSpeed / 6.25);
      if(this.canRecipeUseProductivityModules(req.recipeName)) {
        numberOfMachines = Math.ceil(req.craftingSpeed / 5.5);
      }
      return new MachinesRequirement(req.recipeName, numberOfMachines);
    })
  }

  private getNumberOfProductionRowsNeeded(widthInBeacons: number, requirements: MachinesRequirement[]): number {
    const sumOfMachines = requirements.map(r => {
      return this.hasFluidIngredient(r.recipeName) ? r.amount * 2 : r.amount;
    }).reduce((sum, amount) => sum + amount);
    if(Number.isInteger((sumOfMachines - 1) / (widthInBeacons - 3)) && this.hasFluidIngredient(requirements[requirements.length - 1].recipeName)) {
      return (sumOfMachines - 1) / (widthInBeacons - 3);
    }
    return Math.ceil(sumOfMachines / (widthInBeacons - 3));
  }

  private getNumberOfRoboportRowsNeeded(productionRows: number): number {
    // 1-4 -> 1
    // 5-9 -> 2
    // 10-14 -> 3
    // ...
    return Math.floor(productionRows / 5) + 1;
  }

  private shouldRowContainRoboports(allRowsNumber: number, rowIndex: number): boolean {
    return (Math.floor(rowIndex % 6) == 2) || (rowIndex == allRowsNumber - 1 && (Math.floor(rowIndex % 6) < 2));
  }

  private generateRowOfRoboports(numberOfBeaconsInARow: number, rowIndex: number, firstFreeEntityNumber: number): RoboportEntity[] {
    const numberOfRoboports = Math.floor(numberOfBeaconsInARow * 3 / 4);
    const roboports: RoboportEntity[] = [];
    const yPosition = (rowIndex*8) + 6;
    for(let i = 0; i < numberOfRoboports; i++) {
      const position = new EntityPosition((i*4) + 2, yPosition);
      roboports.push(new RoboportEntity(firstFreeEntityNumber, position));
      firstFreeEntityNumber++;
    }
    return roboports;
  }

  private generateRowOfAssemblyMachines(numberOfBeaconsInARow: number, rowIndex: number, firstFreeEntityNumber: number): object[] {
    const numberOfMachines = numberOfBeaconsInARow - 3;
    const machines: object[] = [];
    const yPosition = (rowIndex*8) + 5.5;
    for(let i = 0; i < numberOfMachines; i++) {
      const position = new EntityPosition((i*3) + 5.5, yPosition);
      const recipeName = this.popNextMachineRequirementRecipe();
      const newMachines = this.generateSingleAssemblyMachine(position, recipeName, firstFreeEntityNumber);
      machines.push(...newMachines);
      firstFreeEntityNumber += newMachines.length;

      if(newMachines.length > 5) {
        // there is additional assembly machine generated for emptying liquids
        i++;
      }
      
      if(this.machinesRequirements.length === 0) {
        return machines;
      }
    }
    return machines;
  }

  private popNextMachineRequirementRecipe(): string {
    const recipeName = this.machinesRequirements[0].recipeName;
    this.machinesRequirements[0].amount--;
    if(this.machinesRequirements[0].amount === 0) {
      this.machinesRequirements = this.machinesRequirements.slice(1);
    }
    return recipeName;
  }

  private generateSingleAssemblyMachine(position: EntityPosition, recipe: string, firstFreeEntityNumber: number): object[] {
    const result: object[] = [];
    const useProductivityModules = this.canRecipeUseProductivityModules(recipe);
    if(useProductivityModules) {
      result.push(AssemblyMachine3Entity.makeMachineWithProductivityModules(firstFreeEntityNumber, position, recipe));
    } else {
      result.push(new AssemblyMachine3Entity(firstFreeEntityNumber, position, recipe));
    }
    firstFreeEntityNumber++;
    const inInserterPosition = position.add(new EntityPosition(-1, 2));
    const inChestPosition = position.add(new EntityPosition(-1, 3));
    const outInserterPosition = position.add(new EntityPosition(0, 2));
    const outChestPosition = position.add(new EntityPosition(0, 3));
    result.push(new StackInserterEntity(firstFreeEntityNumber, inInserterPosition, EntityDirection.up));
    firstFreeEntityNumber++;
    result.push(new StackInserterEntity(firstFreeEntityNumber, outInserterPosition, EntityDirection.down));
    firstFreeEntityNumber++;
    let filters: RequestFilterArray;
    if(useProductivityModules) {
      filters = this.getFiltersForRecipe(recipe, 5.5);
    } else {
      filters = this.getFiltersForRecipe(recipe, 6.25);
    }
    result.push(new LogisticChestRequesterEntity(firstFreeEntityNumber, inChestPosition, filters));
    firstFreeEntityNumber++;
    result.push(new LogisticChestPassiveProviderEntity(firstFreeEntityNumber, outChestPosition));
    firstFreeEntityNumber++;

    const fluidIngredients = this.recipes[recipe].ingredients.filter(ing => ing.type === 'fluid');
    if(fluidIngredients.length === 1) {
      const emptyBarrelRecipeName = `empty-${fluidIngredients[0].name}-barrel`;
      const positionDiff = new EntityPosition(3, 0);
      result.push(new AssemblyMachine3Entity(firstFreeEntityNumber, position.add(positionDiff), emptyBarrelRecipeName));
      firstFreeEntityNumber++;
      result.push(new StackInserterEntity(firstFreeEntityNumber, inInserterPosition.add(positionDiff), EntityDirection.up));
      firstFreeEntityNumber++;
      result.push(new StackInserterEntity(firstFreeEntityNumber, outInserterPosition.add(positionDiff), EntityDirection.down));
      firstFreeEntityNumber++;
      let filters = new RequestFilterArray();
      filters.addFilter(10, `${fluidIngredients[0].name}-barrel`);
      result.push(new LogisticChestRequesterEntity(firstFreeEntityNumber, inChestPosition.add(positionDiff), filters));
      firstFreeEntityNumber++;
      result.push(new LogisticChestActiveProviderEntity(firstFreeEntityNumber, outChestPosition.add(positionDiff)));
      firstFreeEntityNumber++;
    }
    
    return result;
  }

  private hasFluidIngredient(recipeName: string): boolean {
    return this.recipes[recipeName]?.ingredients?.some(ing => ing.type === 'fluid');
  }

  private canRecipeUseProductivityModules(recipeName: string): boolean {
    return [
      'copper-cable',
      'iron-stick',
      'iron-gear-wheel',
      'empty-barrel',
      'electronic-circuit',
      'advanced-circuit',
      'processing-unit',
      'engine-unit',
      'electric-engine-unit',
      'flying-robot-frame',
      'rocket-control-unit',
      'low-density-structure',
      'rocket-fuel',
      'uranium-fuel-cell',
      'automation-science-pack',
      'logistic-science-pack',
      'military-science-pack',
      'chemical-science-pack',
      'production-science-pack',
      'utility-science-pack'
    ].some(r => recipeName === r);
  }

  private getFiltersForRecipe(recipeName: string, craftingSpeed: number): RequestFilterArray {
    const filters = new RequestFilterArray();
    const recipe = this.recipes[recipeName];
    const multiplier = craftingSpeed / recipe.energy_required;
    recipe.ingredients.forEach(ingredient => {
      if(ingredient.type === 'fluid') return;
      const amount = Math.ceil(ingredient.amount * multiplier * this.secondsOfIngredientsBufferedInChest);
      filters.addFilter(amount, ingredient.name);
    });
    return filters;
  }

  private generateRowsOfElectricPoles(numberOfBeaconsInARow: number, numberOfRows: number): MediumElectricPoleEntity[] {
    const result: MediumElectricPoleEntity[] = [];
    const numberOfPolesInARow = Math.ceil(numberOfBeaconsInARow / 2);
    for (let x = 0; x < numberOfPolesInARow; x++) {
      for (let y = 0; y < numberOfRows; y++) {
        const position = new EntityPosition((x * 6) + 0.5, (y * 8) + 0.5);
        const entity_number = x + y * numberOfPolesInARow + 1;
        const neighbours: number[] = [];
        if (x != 0) neighbours.push(entity_number - 1);
        if (x != numberOfPolesInARow - 1) neighbours.push(entity_number + 1);
        if (y != 0) neighbours.push(entity_number - numberOfPolesInARow);
        if (y != numberOfRows - 1) neighbours.push(entity_number + numberOfPolesInARow);
        const newPole = new MediumElectricPoleEntity(entity_number, position, neighbours);
        result.push(newPole);
      }
    }
    return result;
  }

  private generateRowsOfBeacons(numberOfBeaconsInARow: number, numberOfRows: number, firstFreeEntityNumber: number): BeaconEntity[] {
    const result: BeaconEntity[] = [];
    for (let x = 0; x < numberOfBeaconsInARow; x++) {
      for (let y = 0; y < numberOfRows; y++) {
        const newBeacon = BeaconEntity.makeBeaconWithSpeedModules(firstFreeEntityNumber, new EntityPosition((x * 3) + 1.5, (y*8) + 2.5));
        result.push(newBeacon);
        firstFreeEntityNumber++;
      }
    }
    return result;
  }
}