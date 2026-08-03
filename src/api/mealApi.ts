import { CategoryApiResponse } from "@/types/category";
import { MealFilterApiResponse } from "@/types/filter";
import { IngredientApiResponse } from "@/types/ingredient";
import { MealApiResponse } from "@/types/meal";
import { Recipe } from "@/types/recipe";

import { mapMealToRecipe } from "@/utils/mappers/mapMealToRecipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function getMealById(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch meal");
    }

    const data: MealApiResponse = await response.json();

    return data.meals?.length ? mapMealToRecipe(data.meals[0]) : null;
  } catch (error) {
    console.error("Error fetching meal:", error);

    return null;
  }
}

export async function searchMealsByTitle(query: string): Promise<Recipe[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to search meals");
    }

    const data: MealApiResponse = await response.json();

    return data.meals?.map(mapMealToRecipe) ?? [];
  } catch (error) {
    console.error("Error searching meals by title:", error);

    return [];
  }
}

export async function searchMealsByCategory(
  category: string,
): Promise<Recipe[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to search meals by category");
    }

    const data: MealFilterApiResponse = await response.json();

    const requests = data.meals?.map((meal) => getMealById(meal.idMeal)) ?? [];

    const recipes = await Promise.all(requests);

    return recipes.filter((recipe): recipe is Recipe => recipe !== null);
  } catch (error) {
    console.error("Error searching meals by category:", error);

    return [];
  }
}

export async function searchMealsByIngredient(
  ingredient: string,
): Promise<Recipe[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`,
    );

    if (!response.ok) {
      throw new Error("Failed to search meals by ingredient");
    }

    const data: MealFilterApiResponse = await response.json();

    const requests = data.meals?.map((meal) => getMealById(meal.idMeal)) ?? [];

    const recipes = await Promise.all(requests);

    return recipes.filter((recipe): recipe is Recipe => recipe !== null);
  } catch (error) {
    console.error("Error searching meals by ingredient:", error);

    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data: CategoryApiResponse = await response.json();

    return data.meals?.map((category) => category.strCategory) ?? [];
  } catch (error) {
    console.error("Error fetching categories:", error);

    return [];
  }
}

export async function getIngredients(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/list.php?i=list`);

    if (!response.ok) {
      throw new Error("Failed to fetch ingredients");
    }

    const data: IngredientApiResponse = await response.json();

    return data.meals?.map((ingredient) => ingredient.strIngredient) ?? [];
  } catch (error) {
    console.error("Error fetching ingredients:", error);

    return [];
  }
}
