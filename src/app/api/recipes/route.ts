import { NextRequest, NextResponse } from "next/server";

import { createRecipe, getRecipes } from "@/services/recipe.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const recipe = await createRecipe(body);

    return NextResponse.json(recipe, {
      status: 201,
    });
  } catch (error) {
    console.error("Failed to create recipe:", error);

    return NextResponse.json(
      {
        message: "Failed to create recipe",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
    const recipes = await getRecipes();

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Failed to fetch recipes:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch recipes",
      },
      {
        status: 500,
      },
    );
  }
}
