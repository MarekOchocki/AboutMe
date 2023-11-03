
export interface FactorioRecipeItem {
  amount: number;
  name: string;
  type?: 'item' | 'fluid';
}

export interface FactorioRecipe {
  category: 'crafting' | 'smelting' | 'centrifuging' | 'chemistry' | "crafting-with-fluid" | "advanced-crafting";
  name: string;
  energy_required: number;
  ingredients: FactorioRecipeItem[];
  results: FactorioRecipeItem[];
}

export interface FactorioRecipesList {
  [a: string]: FactorioRecipe;
}