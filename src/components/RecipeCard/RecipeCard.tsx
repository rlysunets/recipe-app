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

export function RecipeCard() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "26px",
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
        <Typography sx={{ fontWeight: 700 }}>Title</Typography>

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
        }}
      />

      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 13,
          mb: 1,
        }}
      >
        Category
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
        <Chip label="Tag" size="small" />
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
