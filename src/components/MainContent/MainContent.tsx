import { Box, Button, Typography } from "@mui/material";

import { RecipeCard } from "@/components/RecipeCard";
import { Recipe } from "@/types/recipe";

type Props = {
  recipes: Recipe[];
};

export function MainContent({ recipes }: Props) {
  console.log(recipes);

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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "26px",
        }}
      >
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
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
