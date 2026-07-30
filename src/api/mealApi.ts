import { MealApiResponse } from "@/types/meal";
import { mapMealToRecipe } from "@/utils/mappers/mapMealToRecipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchMeals(query: string) {
  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
  );

  const data: MealApiResponse = await response.json();

  return data.meals?.map(mapMealToRecipe) ?? [];
}
