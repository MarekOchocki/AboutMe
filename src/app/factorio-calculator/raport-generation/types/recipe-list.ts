import { Recipe } from "./recipe";

export class RecipeList {

    private productToRecipe: Map<string, Recipe> = new Map();

    public constructor(recipes: Recipe[]) {
        recipes.forEach(recipe => {
            this.productToRecipe.set(recipe.output.name, recipe)
        });
    }

    public getRecipeForItem(itemName: string): Recipe | undefined {
        return this.productToRecipe.get(itemName);
    }
}
