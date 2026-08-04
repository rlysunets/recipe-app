import { MealApi } from "@/types/meal";
import { Recipe, RecipeIngredient } from "@/types/recipe";

function mapIngredients(meal: MealApi): RecipeIngredient[] {
  const ingredients: RecipeIngredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof MealApi];
    const measure = meal[`strMeasure${i}` as keyof MealApi];

    if (typeof ingredient === "string" && ingredient.trim()) {
      ingredients.push({
        ingredient,
        measure: typeof measure === "string" ? measure : "",
      });
    }
  }

  return ingredients;
}

export function mapMealToRecipe(meal: MealApi): Recipe {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    image: meal.strMealThumb,
    tags: meal.strTags ? meal.strTags.split(",") : [],
    instructions: meal.strInstructions,
    youtube: meal.strYoutube,
    ingredients: mapIngredients(meal),
  };
}
