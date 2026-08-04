"use client";

import { Recipe } from "@/types/recipe";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  recipe: Recipe;
};

export function RecipeHeader({ recipe }: Props) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 3,
      }}
    >
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>

      <Typography
        variant="h4"
        sx={{
          ml: 1,
          flexGrow: 1,
          fontWeight: 700,
        }}
      >
        {recipe.title}
      </Typography>

      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
    </Box>
  );
}
