import { useState, useEffect } from "react";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import { RecipeCard } from "@/components/RecipeCard";
import { Recipe } from "@/types/recipe";

type Props = {
  recipes: Recipe[];
  hasSearched: boolean;
  isLoading: boolean;
};

const PAGE_SIZE = 6;

export function MainContent({ recipes, hasSearched, isLoading }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [recipes]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const visibleRecipes = recipes.slice(0, visibleCount);
  const hasMore = visibleCount < recipes.length;

  if (recipes.length === 0 && !hasSearched && !isLoading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "70vh",
        }}
      >
        <RestaurantMenuIcon
          sx={{
            fontSize: 80,
            color: "text.secondary",
            mb: 2,
          }}
        />

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Search for delicious recipes
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Choose a search type on the left,
          <br />
          enter your query and press Submit.
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress size={56} />
      </Box>
    );
  }

  if (recipes.length === 0 && hasSearched) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "70vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          No recipes found
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Try another search.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 32,
          my: 3,
        }}
      >
        {hasSearched ? "Search results" : "Our recipes"}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "26px",
          mb: 4,
        }}
      >
        {visibleRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Box>

      {hasMore && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            onClick={handleShowMore}
            sx={{
              width: 176,
              height: 42,
              borderRadius: 2,
              textTransform: "none",
              mb: 4,
            }}
          >
            Show more
          </Button>
        </Box>
      )}
    </Box>
  );
}
