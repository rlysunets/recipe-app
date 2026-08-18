"use client";

import { useState } from "react";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 390,
          p: 3,
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Button
            variant={isRegister ? "outlined" : "contained"}
            size="small"
            onClick={() => setIsRegister(false)}
            sx={{
              height: 32,
              borderRadius: 2,
              textTransform: "none",
              borderColor: "primary.main",
              color: isRegister
                ? "primary.main"
                : "primary.contrastText",
              bgcolor: isRegister ? "transparent" : "primary.main",

              "&:hover": {
                borderColor: "primary.main",
                bgcolor: isRegister
                  ? "action.hover"
                  : "primary.dark",
              },
            }}
          >
            Sign in
          </Button>

          <Button
            variant={isRegister ? "contained" : "outlined"}
            size="small"
            onClick={() => setIsRegister(true)}
            sx={{
              height: 32,
              borderRadius: 2,
              textTransform: "none",
              borderColor: "primary.main",
              color: isRegister
                ? "primary.contrastText"
                : "primary.main",
              bgcolor: isRegister ? "primary.main" : "transparent",

              "&:hover": {
                borderColor: "primary.main",
                bgcolor: isRegister
                  ? "primary.dark"
                  : "action.hover",
              },
            }}
          >
            Register
          </Button>
        </Box>

        {isRegister && (
          <>
            <Typography component="label" sx={{ display: "block", mb: 0.5 }}>
              Name
            </Typography>

            <TextField
              fullWidth
              size="small"
              placeholder="John Doe"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </>
        )}

        <Typography component="label" sx={{ display: "block", mb: 0.5 }}>
          Email
        </Typography>

        <TextField
          fullWidth
          size="small"
          type="email"
          placeholder="example@gmail.com"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        <Typography component="label" sx={{ display: "block", mb: 0.5 }}>
          Password
        </Typography>

        <TextField
          fullWidth
          size="small"
          type="password"
          placeholder="Password"
          sx={{
            mb: isRegister ? 2 : 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        {isRegister && (
          <>
            <Typography
              component="label"
              sx={{ display: "block", mb: 0.5 }}
            >
              Repeat password
            </Typography>

            <TextField
              fullWidth
              size="small"
              type="password"
              placeholder="Repeat password"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </>
        )}

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
          {isRegister ? "Register" : "Sign in"}
        </Button>
      </Paper>
    </Box>
  );
}
