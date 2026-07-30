import { Box, Button, Typography } from "@mui/material";

import { RecipeCard } from "@/components/RecipeCard";

export function MainContent() {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          my: 3,
          fontSize: 32,
        }}
      >
        Search results
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "26px",
          rowGap: "24px",
        }}
      >
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />

      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: 176,
            height: 42,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 2,
            textTransform: "none",

            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          Show more
        </Button>
      </Box>
    </Box>
  );
}
