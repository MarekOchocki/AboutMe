import { ProductionCalculator } from './calculations/production-calculator';
import * as recipes from './data/recipes.json';
import * as outputsJSON from './data/outputs.json';
import * as inputsJSON from './data/inputs.json';
import * as pako from 'pako';
import { Buffer } from "buffer";
import { Recipe, RecipeStruct } from './types/recipe';
import { RecipeList } from './types/recipe-list';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from './types/item';
import { ProductionRaport } from './types/production-raport';
import { BlueprintRequirement, EndgameGenerator } from '../blueprint-generation/generator/endgame-generator';


export class FactorioCalculatorService {
  private productionCalculator: ProductionCalculator;

  private allPossibleInputs: string[];
  private allPossibleOutputs: string[];
  private currentInputs = new BehaviorSubject<string[]>([]);
  private availableInputs = new BehaviorSubject<string[]>([]);
  
  private currentOutputs = new BehaviorSubject<Item[]>([]);
  private availableOutputs = new BehaviorSubject<string[]>([]);
  private raport = new BehaviorSubject<ProductionRaport | undefined>(undefined);

  private endgameGenerator = new EndgameGenerator();

  constructor() {
    const importedRecipes = recipes as {recipes: RecipeStruct[]};
    const importedInputs = inputsJSON as {items: string[]};
    const importedOutputs = outputsJSON as {items: string[]};

    const recipesParsed: Recipe[] = importedRecipes.recipes.map(r => new Recipe(r));
    const recipeList = new RecipeList(recipesParsed);
    this.productionCalculator = new ProductionCalculator(recipeList);
    
    this.allPossibleInputs = importedInputs.items;
    this.allPossibleOutputs = importedOutputs.items;

    this.updateAvailableInputs();
    this.availableOutputs.next(this.allPossibleOutputs);

    this.addOutput(new Item('processing-unit', 10));
  }

  public getCurrentInputs(): Observable<string[]> {
    return this.currentInputs.asObservable();
  }

  public getAvailableInputs(): Observable<string[]> {
    return this.availableInputs.asObservable();
  }

  public getCurrentRequestedOutputs(): Observable<Item[]> {
    return this.currentOutputs.asObservable();
  }

  public getAvailableOutputs(): Observable<string[]> {
    return this.availableOutputs.asObservable();
  }

  public getRaport(): Observable<ProductionRaport | undefined> {
    return this.raport.asObservable();
  }

  public calculateBlueprintFromRaport(widthInBeacons: number): string {
    const requirements: BlueprintRequirement[] = this.raport.getValue()?.productionSteps.map(step => {
      return new BlueprintRequirement(step.itemName, step.craftingSpeedNeeded);
    }) ?? [];
    const blueprint = this.endgameGenerator.createFromRequirements(requirements, widthInBeacons);
    return this.blueprintObjectToString(blueprint);
  }

  public addInput(itemName: string): void {
    if(this.allPossibleInputs.some(input => itemName === input)) {
      if(this.currentInputs.value.every(current => current !== itemName)) {
        this.currentInputs.next([...this.currentInputs.value, itemName]);
        this.updateAvailableInputs();
        this.recalculateRaport();
      }
    }
  }

  public removeInput(itemName: string): void {
    const newInputs = this.currentInputs.value.filter(input => input !== itemName);
    if(newInputs.length === this.currentInputs.value.length) { return; }
    this.currentInputs.next(newInputs);
    this.updateAvailableInputs();
    this.recalculateRaport();
  }

  public addOutput(item: Item): void {
    if(this.allPossibleOutputs.some(output => item.name === output)) {
      if(this.currentOutputs.value.every(current => current.name !== item.name)) {
        this.currentOutputs.next([...this.currentOutputs.value, item]);
        this.updateAvailableOutputs();
        this.recalculateRaport();
      }
    }
  }

  public changeOutputAmount(itemName: string, newAmount: number): void {
    const outputItem = this.currentOutputs.value.find(output => output.name === itemName);
    if(!outputItem) { return; }
    outputItem.count = newAmount;
    this.currentOutputs.next([...this.currentOutputs.value]);
    this.recalculateRaport();
  }

  public removeOutput(itemName: string): void {
    const newOutputs = this.currentOutputs.value.filter(output => output.name !== itemName);
    if(newOutputs.length === this.currentOutputs.value.length) { return; }
    this.currentOutputs.next(newOutputs);
    this.updateAvailableOutputs();
    this.recalculateRaport();
  }

  public recalculateRaport(): void {
    const newRaport = this.productionCalculator.createProductionRaport(this.currentOutputs.value, this.currentInputs.value);
    this.raport.next(newRaport);
  }

  private updateAvailableInputs(): void {
    const newAvailableInputs = this.allPossibleInputs.filter(input => this.currentInputs.value.every(current => current !== input));
    this.availableInputs.next(newAvailableInputs);
  }

  private updateAvailableOutputs(): void {
    const newAvailableOutputs = this.allPossibleOutputs.filter(output => this.currentOutputs.value.every(current => current.name !== output));
    this.availableOutputs.next(newAvailableOutputs);
  }

  private blueprintStringToObject(blueprintString: string): object {
    const removedVersionByte = blueprintString.slice(1);
    const decoded64 = Buffer.from(removedVersionByte, 'base64');
    const jsonString = pako.inflate(decoded64, { to: 'string' });
    return JSON.parse(jsonString);
  }

  private blueprintObjectToString(object: object): string {
    const jsonString = JSON.stringify(object);
    const encoded = pako.deflate(jsonString);
    const encoded64 = Buffer.from(encoded).toString('base64');
    return '0'+encoded64;
  }
}
