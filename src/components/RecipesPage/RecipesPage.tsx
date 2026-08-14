"use client";

import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";

import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";

import {
  getCategories,
  getIngredients,
  searchMealsByCategory,
  searchMealsByIngredient,
  searchMealsByTitle,
} from "@/api/mealApi";
import {
  searchRecipesByCategory,
  searchRecipesByIngredient,
  searchRecipesByTitle,
} from "@/api/recipeApi";

import { Recipe } from "@/types/recipe";
import { SearchBy } from "@/types/search";

export function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      const [categories, ingredients] = await Promise.all([
        getCategories(),
        getIngredients(),
      ]);

      setCategories(categories);
      setIngredients(ingredients);

      await loadRecipes();
    }

    loadInitialData();
  }, []);

  async function handleSearch(type: SearchBy, query: string) {
    setHasSearched(true);
    setIsLoading(true);

    let data: Recipe[] = [];

    switch (type) {
      case "title": {
        const [dbRecipes, apiRecipes] = await Promise.all([
          searchRecipesByTitle(query),
          searchMealsByTitle(query),
        ]);

        data = [...dbRecipes, ...apiRecipes];
        break;
      }

      case "category": {
        const [dbRecipes, apiRecipes] = await Promise.all([
          searchRecipesByCategory(query),
          searchMealsByCategory(query),
        ]);

        data = [...dbRecipes, ...apiRecipes];
        break;
      }

      case "ingredient": {
        const [dbRecipes, apiRecipes] = await Promise.all([
          searchRecipesByIngredient(query),
          searchMealsByIngredient(query),
        ]);

        data = [...dbRecipes, ...apiRecipes];
        console.log(data);
        break;
      }
    }

    setRecipes(data);
    setIsLoading(false);
  }

  async function loadRecipes() {
    setIsLoading(true);

    const response = await fetch("/api/recipes");

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data: Recipe[] = await response.json();

    console.log("Recipes from API:", data);

    setRecipes(data);
    setIsLoading(false);
  }

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            gap: 4,
          }}
        >
          <Sidebar
            categories={categories}
            ingredients={ingredients}
            onSearch={handleSearch}
          />

          <MainContent
            recipes={recipes}
            hasSearched={hasSearched}
            isLoading={isLoading}
          />
        </Box>
      </Container>
    </>
  );
}
