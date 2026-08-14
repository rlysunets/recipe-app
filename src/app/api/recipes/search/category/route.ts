import { NextRequest, NextResponse } from "next/server";

import { searchRecipesByCategory } from "@/services/recipe.service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json([]);
  }

  const recipes = await searchRecipesByCategory(query);

  return NextResponse.json(recipes);
}
