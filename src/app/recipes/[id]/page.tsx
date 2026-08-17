import { notFound } from "next/navigation";

import { getMealById } from "@/api/mealApi";
import { RecipeDetails } from "@/components/RecipeDetails/RecipeDetails";
import { getRecipeById } from "@/services/recipe.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecipeDetailsPage({ params }: Props) {
  const { id } = await params;

  const dbRecipe = await getRecipeById(Number(id));
  const recipe = dbRecipe ?? (await getMealById(id));

  if (!recipe) {
    notFound();
  }

  return <RecipeDetails recipe={recipe} />;
}
