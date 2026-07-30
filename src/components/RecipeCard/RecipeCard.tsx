"use client";

import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";

import { Recipe } from "@/types/recipe";

type Props = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: Props) {
  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: "text.primary",
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: 700 }}>{recipe.title}</Typography>

        <IconButton size="small">
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          bgcolor: "grey.100",
          borderRadius: 2,
          mb: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </Box>

      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 13,
          mb: 1,
        }}
      >
        {recipe.category}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Chip label={recipe.tags[0]} size="small" />
        <Chip label="Tag" size="small" />
        <Chip label="Tag" size="small" />
        <Chip label="Tag" size="small" />
      </Stack>

      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          borderColor: "primary.main",
          color: "primary.main",
          borderRadius: 2,
        }}
      >
        Details
      </Button>
    </Box>
  );
}
