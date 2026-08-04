export interface RecipeIngredient {
  ingredient: string;
  measure: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  area: string;
  image: string;
  tags: string[];
  instructions: string;
  youtube: string;
  ingredients: RecipeIngredient[];
}
