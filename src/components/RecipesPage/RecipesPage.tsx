"use client";

import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

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

  const router = useRouter();
  const searchParams = useSearchParams();

  // Зчитуємо поточні фільтри з URL (якщо параметрів немає — за замовчуванням "title" та порожній рядок)
  const currentFilter = (searchParams.get("filter") as SearchBy) || "title";
  const currentQuery = searchParams.get("query") || "";

  // 1. Завантажуємо категорії та інгредієнти лише один раз при першому рендері
  useEffect(() => {
    async function loadMeta() {
      try {
        const [fetchedCategories, fetchedIngredients] = await Promise.all([
          getCategories(),
          getIngredients(),
        ]);
        setCategories(fetchedCategories);
        setIngredients(fetchedIngredients);
      } catch (error) {
        console.error("Помилка завантаження метаданих:", error);
      }
    }

    loadMeta();
  }, []);

  // 2. Реагуємо на зміну URL (searchParams) — це єдине джерело правди для рецептів
  useEffect(() => {
    async function syncDataWithUrl() {
      setIsLoading(true);

      const filter = searchParams.get("filter") as SearchBy | null;
      const query = searchParams.get("query");

      try {
        if (filter && query) {
          setHasSearched(true);
          const data = await getSearchResults(filter, query);
          setRecipes(data);
        } else {
          setHasSearched(false);
          const data = await getAllRecipes();
          setRecipes(data);
        }
      } catch (error) {
        console.error("Помилка завантаження рецептів:", error);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    }

    syncDataWithUrl();
  }, [searchParams]);

  // Допоміжна функція пошуку
  async function getSearchResults(
    type: SearchBy,
    query: string,
  ): Promise<Recipe[]> {
    switch (type) {
      case "title": {
        const [dbRecipes, apiRecipes] = await Promise.all([
          searchRecipesByTitle(query),
          searchMealsByTitle(query),
        ]);
        return [...dbRecipes, ...apiRecipes];
      }
      case "category": {
        const [dbRecipes, apiRecipes] = await Promise.all([
          searchRecipesByCategory(query),
          searchMealsByCategory(query),
        ]);
        return [...dbRecipes, ...apiRecipes];
      }
      case "ingredient": {
        const [dbRecipes, apiRecipes] = await Promise.all([
          searchRecipesByIngredient(query),
          searchMealsByIngredient(query),
        ]);
        return [...dbRecipes, ...apiRecipes];
      }
      default:
        return [];
    }
  }

  // Допоміжна функція завантаження всіх рецептів
  async function getAllRecipes(): Promise<Recipe[]> {
    const response = await fetch("/api/recipes");
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    return await response.json();
  }

  // При сабміті форми лише оновлюємо URL. useEffect автоматично підхопить зміни.
  function handleSearch(type: SearchBy, query: string) {
    if (query.trim()) {
      router.push(`/?filter=${type}&query=${encodeURIComponent(query)}`);
    } else {
      router.push("/");
    }
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", gap: 4 }}>
        <Sidebar
          categories={categories}
          ingredients={ingredients}
          initialFilter={currentFilter}
          initialQuery={currentQuery}
          onSearch={handleSearch}
        />
        <MainContent
          recipes={recipes}
          hasSearched={hasSearched}
          isLoading={isLoading}
        />
      </Box>
    </Container>
  );
}
