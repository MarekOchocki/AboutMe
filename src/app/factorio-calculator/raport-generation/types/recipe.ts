import { Item } from "./item";
import { MachineType } from "./machine-type";

type seconds = number;

export interface RecipeStruct {
    input: {
        name: string;
        count: number;
    }[];
    output: {
        name: string;
        count: number;
    };
    machine: MachineType;
    craftingTime: seconds;
    maxProductivityModifier: number;
    a: number;
}

export class Recipe {
    input: Item[];
    output: Item;
    machine: MachineType;
    craftingTime: seconds;
    maxProductivityModifier: number;

    constructor(recipeStruct: RecipeStruct) {
        this.input = recipeStruct.input.map(i => new Item(i.name, i.count));
        this.output = new Item(recipeStruct.output.name, recipeStruct.output.count);
        this.machine = recipeStruct.machine;
        this.craftingTime = recipeStruct.craftingTime;
        this.maxProductivityModifier = recipeStruct.maxProductivityModifier;
    }
}