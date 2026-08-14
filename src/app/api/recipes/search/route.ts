import { NextRequest, NextResponse } from "next/server";

import { searchRecipesByTitle } from "@/services/recipe.service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json([]);
  }

  const recipes = await searchRecipesByTitle(query);

  return NextResponse.json(recipes);
}
