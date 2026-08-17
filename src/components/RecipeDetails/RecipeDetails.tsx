"use client";

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { RecipeHeader } from "./RecipeHeader";
import { IngredientsList } from "./IngredientsList";
import { Recipe } from "@/types/recipe";

import Image from "next/image";
import { useState } from "react";

type Props = {
  recipe: Recipe;
};

export function RecipeDetails({ recipe }: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          py: 4,
        }}
      >
        <RecipeHeader recipe={recipe} />

        {recipe.image && !imageError && (
          <Box
            sx={{
              width: "100%",
              height: 420,
              position: "relative",
              overflow: "hidden",
              borderRadius: 2,
              mb: 4,
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              loading="eager"
              onError={() => setImageError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 4,
            mb: 4,
          }}
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mb: 2,
              }}
            >
              {recipe.tags.length > 0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{
                    flexWrap: "wrap",
                    mb: 2,
                  }}
                >
                  {recipe.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Stack>
              )}
            </Box>

            <Box
              sx={{
                mb: 1,
              }}
            >
              <strong>Category:</strong> {recipe.category}
            </Box>

            <Box
              sx={{
                mb: 3,
              }}
            >
              <strong>Area:</strong> {recipe.area}
            </Box>

            <IngredientsList ingredients={recipe.ingredients} />
          </Box>

          <Box
            sx={{
              width: 150,
            }}
          >
            {/* Правий блок залишимо на потім */}
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography
          sx={{
            whiteSpace: "pre-line",
            lineHeight: 1.8,
            mb: 4,
          }}
        >
          {recipe.instructions}
        </Typography>

        {recipe.youtube && (
          <Button
            variant="contained"
            href={recipe.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube
          </Button>
        )}
      </Box>
    </Container>
  );
}
