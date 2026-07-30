"use client";

import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

export function Sidebar() {
  const [searchBy, setSearchBy] = useState("title");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");

  return (
    <Box
      sx={{
        width: 320,
        minHeight: "calc(100vh - 64px)",
        px: 3,
        py: 7,
        borderRight: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1.2,
          mb: 4,
        }}
      >
        Search by
      </Typography>

      <FormControl fullWidth>
        <RadioGroup
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <FormControlLabel
            value="title"
            control={<Radio size="small" />}
            label="Title"
          />

          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            size="small"
            fullWidth
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <FormControlLabel
            value="category"
            control={<Radio size="small" />}
            label="Category"
          />

          <TextField
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="small"
            fullWidth
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          >
            <MenuItem value="">Select category</MenuItem>
            <MenuItem value="beef">Beef</MenuItem>
            <MenuItem value="chicken">Chicken</MenuItem>
            <MenuItem value="dessert">Dessert</MenuItem>
          </TextField>

          <FormControlLabel
            value="ingredient"
            control={<Radio size="small" />}
            label="Ingredient"
          />

          <TextField
            select
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            size="small"
            fullWidth
            sx={{
              mb: 5,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          >
            <MenuItem value="">Select ingredient</MenuItem>
            <MenuItem value="egg">Egg</MenuItem>
            <MenuItem value="milk">Milk</MenuItem>
            <MenuItem value="chicken">Chicken</MenuItem>
          </TextField>
        </RadioGroup>
      </FormControl>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          sx={{
            height: 48,
            borderRadius: 2,
            textTransform: "none",
            borderColor: "primary.main",
            color: "primary.main",

            "&:hover": {
              borderColor: "primary.main",
            },
          }}
        >
          Clear
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{
            height: 48,
            borderRadius: 2,
            textTransform: "none",
            bgcolor: "primary.main",
            color: "primary.contrastText",

            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          Submit
        </Button>
      </Box>

      <Box sx={{ mt: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <IconButton href="#" target="_blank">
            <LinkedInIcon />
          </IconButton>

          <IconButton href="#" target="_blank">
            <GitHubIcon />
          </IconButton>

          <IconButton href="#" target="_blank">
            <FacebookIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
