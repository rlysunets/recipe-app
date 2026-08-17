import { prisma } from "@/lib/prisma";
import { Recipe } from "@/types/recipe";

export async function createRecipe(data: {
  title: string;
  description?: string;
  image?: string;
  category: string;
  ingredients: object;
  instructions: string;
  userId?: number;
}) {
  return prisma.recipe.create({
    data,
  });
}

export async function getRecipes(): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany();

  return recipes.map((recipe) => ({
    id: String(recipe.id),
    title: recipe.title,
    category: recipe.category,
    area: recipe.area ?? "",
    image: recipe.image ?? "",
    tags: recipe.tags,
    instructions: recipe.instructions,
    youtube: recipe.youtube ?? "",
    ingredients: recipe.ingredients as unknown as Recipe["ingredients"],
  }));
}

export async function searchRecipesByTitle(query: string) {
  return prisma.recipe.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
}

export async function searchRecipesByCategory(query: string) {
  return prisma.recipe.findMany({
    where: {
      category: {
        equals: query,
        mode: "insensitive",
      },
    },
  });
}

export async function searchRecipesByIngredient(query: string) {
  const recipes = await prisma.recipe.findMany();

  return recipes.filter((recipe) => {
    const ingredients = recipe.ingredients;

    if (!Array.isArray(ingredients)) {
      return false;
    }

    return ingredients.some((item) => {
      if (
        typeof item !== "object" ||
        item === null ||
        !("ingredient" in item)
      ) {
        return false;
      }

      return (
        typeof item.ingredient === "string" &&
        item.ingredient.toLowerCase().includes(query.toLowerCase())
      );
    });
  });
}

export async function getRecipeById(id: number): Promise<Recipe | null> {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id,
    },
  });

  if (!recipe) {
    return null;
  }

  return {
    id: String(recipe.id),
    title: recipe.title,
    category: recipe.category,
    area: recipe.area ?? "",
    image: recipe.image ?? "",
    tags: recipe.tags,
    instructions: recipe.instructions,
    youtube: recipe.youtube ?? "",
    ingredients: recipe.ingredients as unknown as Recipe["ingredients"],
  };
}
