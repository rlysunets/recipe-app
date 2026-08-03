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
  Autocomplete,
} from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

import { SearchBy } from "@/types/search";

export type Props = {
  categories: string[];
  ingredients: string[];
  onSearch: (type: SearchBy, query: string) => void;
};

export function Sidebar({ categories, ingredients, onSearch }: Props) {
  const [searchBy, setSearchBy] = useState<SearchBy>("title");
  const [query, setQuery] = useState("");

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
          onChange={(e) => {
            setSearchBy(e.target.value as SearchBy);
            setQuery("");
          }}
        >
          <FormControlLabel
            value="title"
            control={<Radio size="small" />}
            label="Title"
          />

          {searchBy === "title" && (
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title"
              size="small"
              fullWidth
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          )}

          <FormControlLabel
            value="category"
            control={<Radio size="small" />}
            label="Category"
          />

          {searchBy === "category" && (
            <TextField
              select
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="small"
              fullWidth
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select category
              </MenuItem>

              {categories.map((category) => (
                <MenuItem value={category} key={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          )}

          <FormControlLabel
            value="ingredient"
            control={<Radio size="small" />}
            label="Ingredient"
          />

          {searchBy === "ingredient" && (
            <Autocomplete
              options={ingredients}
              value={query}
              onChange={(_, value) => setQuery(value ?? "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ingredient"
                  size="small"
                  placeholder="Select ingredient"
                />
              )}
              size="small"
              fullWidth
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          )}
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
          onClick={() => {
            setSearchBy("title");
            setQuery("");
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
          onClick={() => onSearch(searchBy, query)}
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
