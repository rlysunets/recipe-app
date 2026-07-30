import { MealApi } from "@/types/meal";
import { Recipe } from "@/types/recipe";

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
  };
}
