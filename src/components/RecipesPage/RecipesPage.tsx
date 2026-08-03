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

import { Recipe } from "@/types/recipe";
import { SearchBy } from "@/types/search";

export function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
      const [categories, ingredients] = await Promise.all([
        getCategories(),
        getIngredients(),
      ]);

      setCategories(categories);
      setIngredients(ingredients);
    }

    loadInitialData();
  }, []);

  async function handleSearch(type: SearchBy, query: string) {
    setHasSearched(true);
    setIsLoading(true);
    let data: Recipe[] = [];

    switch (type) {
      case "title":
        data = await searchMealsByTitle(query);
        break;

      case "category":
        data = await searchMealsByCategory(query);
        break;

      case "ingredient":
        data = await searchMealsByIngredient(query);
        break;
    }

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
