import { Item } from "../types/item";
import { MachineType } from "../types/machine-type";
import { ProductionRaport } from "../types/production-raport";
import { ProductionStep } from "../types/production-step";
import { RecipeList } from "../types/recipe-list";

type CraftingSpeed = number;
type ItemName = string;

export class ProductionCalculator {
    private recipes: RecipeList;
    private itemsToCraftingSpeedNeeded = new Map<ItemName, CraftingSpeed>();
    private basicResourceNeededPerMinute: Item[] = [];

    public constructor(recipeList: RecipeList) {
        this.recipes = recipeList;
    }

    public createProductionRaport(itemsPerMinute: Item[], inputsToIgnore: string[]): ProductionRaport {
        itemsPerMinute.forEach(input => this.addCraftingSpeedForItem(input, inputsToIgnore));
        const result: ProductionStep[] = [];
        this.itemsToCraftingSpeedNeeded.forEach((value, key) => {
            const recipe = this.recipes.getRecipeForItem(key);
            if(recipe !== undefined && value > 0) {
                const machineCraftingSpeed = this.machineTypeToCraftingSpeed(recipe.machine);
                const machinesAmount = value / (machineCraftingSpeed * this.productivityToSpeedRatio(recipe.maxProductivityModifier));
                result.push(new ProductionStep(key, value, recipe.machine, machinesAmount));
            }
        });
        const raport = new ProductionRaport(result, this.basicResourceNeededPerMinute);
        this.itemsToCraftingSpeedNeeded = new Map<ItemName, CraftingSpeed>();
        this.basicResourceNeededPerMinute = [];
        return raport;
    }

    private addCraftingSpeedForItem(itemsPerMinute: Item, inputsToIgnore: string[]): void {
        if(inputsToIgnore.some(ignore => ignore === itemsPerMinute.name)) { return; }
        const recipe = this.recipes.getRecipeForItem(itemsPerMinute.name);
        if(recipe === undefined) { this.storeBasicResourceNeeded(itemsPerMinute); return; }
        const productivityModifier = recipe.maxProductivityModifier;
        const itemProducedByOneCraftingSpeedPerMinute = recipe.output.count / recipe.craftingTime * productivityModifier * 60.0;
        const requiredCraftingSpeed = itemsPerMinute.count / itemProducedByOneCraftingSpeedPerMinute;

        const requiredCurrent = this.getCraftingSpeedNeededForItem(itemsPerMinute);
        this.itemsToCraftingSpeedNeeded.set(itemsPerMinute.name, requiredCurrent + requiredCraftingSpeed);

        const inputsRequiredPerMinute = recipe.input.map(input => input.divide(recipe.craftingTime / 60.0).multiply(itemsPerMinute.count / itemProducedByOneCraftingSpeedPerMinute));
        inputsRequiredPerMinute.forEach(input => this.addCraftingSpeedForItem(input, inputsToIgnore));
    }

    private getCraftingSpeedNeededForItem(item: Item): number {
        if(this.itemsToCraftingSpeedNeeded.has(item.name))
            return this.itemsToCraftingSpeedNeeded.get(item.name) as number;
        return 0;
    }

    private storeBasicResourceNeeded(itemPerMinute: Item): void {
        this.basicResourceNeededPerMinute.push(itemPerMinute);
    }

    private machineTypeToCraftingSpeed(machineType: MachineType): number {
        if(machineType === MachineType.AssembyMachine) { 
            return 1.25;
        } else
        if(machineType === MachineType.ChemicalPlant) { 
            return 1;
        } else
        if(machineType === MachineType.Furnace) { 
            return 2;
        }
        return 1;
    }

    private productivityToSpeedRatio(maxProductivity: number): number {
        if(maxProductivity === 1) { return 1; }
        const bonus = maxProductivity - 1;
        const speedPenalty = bonus * 1.5;
        return 1 - speedPenalty;
    }
}