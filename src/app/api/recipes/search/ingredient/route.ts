import { NextRequest, NextResponse } from "next/server";

import { searchRecipesByIngredient } from "@/services/recipe.service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json([]);
  }

  const recipes = await searchRecipesByIngredient(query);

  return NextResponse.json(recipes);
}
