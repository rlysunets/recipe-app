import { Recipe } from "@/types/recipe";

export async function searchRecipesByTitle(query: string): Promise<Recipe[]> {
  const response = await fetch(
    `/api/recipes/search?query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search recipes");
  }

  return response.json();
}

export async function searchRecipesByCategory(
  query: string,
): Promise<Recipe[]> {
  const response = await fetch(
    `/api/recipes/search/category?query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search recipes by category");
  }

  return response.json();
}

export async function searchRecipesByIngredient(
  query: string,
): Promise<Recipe[]> {
  const response = await fetch(
    `/api/recipes/search/ingredient?query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search recipes by ingredient");
  }

  return response.json();
}
