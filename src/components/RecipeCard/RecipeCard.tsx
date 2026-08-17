"use client";

import { useState } from "react";

import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import Link from "next/link";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Recipe } from "@/types/recipe";

type Props = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: "text.primary",
        borderRadius: 3,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          mb: 2,
          minHeight: "48px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            flexGrow: 1,
          }}
        >
          {recipe.title}
        </Typography>

        <IconButton size="small">
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          bgcolor: "grey.100",
          mb: 2,
        }}
      >
        {recipe.image && !imageError ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            onError={() => setImageError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <img
            src="/placeholder-recipe.jpg"
            alt="No image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 1,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 13,
            mb: 1,
          }}
        >
          {recipe.category}
        </Typography>

        {recipe.tags.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            {recipe.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
        )}
      </Box>
      <Button
        component={Link}
        href={`/recipes/${recipe.id}`}
        variant="outlined"
        sx={{
          textTransform: "none",
          borderRadius: 2,
        }}
      >
        Details
      </Button>
    </Box>
  );
}
