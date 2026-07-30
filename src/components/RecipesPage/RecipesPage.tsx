"use client";

import { useState } from "react";
import { Box, Container } from "@mui/material";

import { Sidebar } from "@/components/Sidebar";
import { MainContent } from "@/components/MainContent";
import { searchMeals } from "@/api/mealApi";
import { Recipe } from "@/types/recipe";

export function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function handleSearch(query: string) {
    const data = await searchMeals(query);

    setRecipes(data);
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
          <Sidebar onSearch={handleSearch} />

          <MainContent recipes={recipes} />
        </Box>
      </Container>
    </>
  );
}
