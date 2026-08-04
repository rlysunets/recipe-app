import { Box, Typography } from "@mui/material";

import { RecipeIngredient } from "@/types/recipe";

type Props = {
  ingredients: RecipeIngredient[];
};

export function IngredientsList({ ingredients }: Props) {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 20,
          mb: 2,
        }}
      >
        Ingredients
      </Typography>

      <Box
        component="ul"
        sx={{
          pl: 3,
          m: 0,
        }}
      >
        {ingredients.map(({ ingredient, measure }) => (
          <Box
            component="li"
            key={ingredient}
            sx={{
              mb: 1,
            }}
          >
            <strong>{measure}</strong> {ingredient}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
