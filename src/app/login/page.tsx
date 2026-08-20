"use client";

import { useState } from "react";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
    general?: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const router = useRouter();

  async function handleLogin() {
    setErrors({});
    setSuccess("");

    const validationErrors: typeof errors = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: "Invalid email or password" });

        return;
      }

      setSuccess("Login successful");
      router.push("/");
    } catch {
      setErrors({
        general: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    setErrors({});
    setSuccess("");

    const validationErrors: typeof errors = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must contain at least 6 characters";
    }

    if (!repeatPassword) {
      validationErrors.repeatPassword = "Please repeat your password";
    } else if (password !== repeatPassword) {
      validationErrors.repeatPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          name: data.errors?.name?.[0],
          email: data.errors?.email?.[0],
          password: data.errors?.password?.[0],
        });

        return;
      }

      setSuccess("Registration successful");

      setPassword("");
      setRepeatPassword("");
    } catch {
      setErrors({
        email: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

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
        {/* Таби перемикання */}
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
            onClick={() => {
              setIsRegister(false);
              setErrors({});
              setSuccess("");
            }}
            sx={{
              height: 32,
              borderRadius: 2,
              textTransform: "none",
              borderColor: "primary.main",
              color: isRegister ? "primary.main" : "primary.contrastText",
              bgcolor: isRegister ? "transparent" : "primary.main",

              "&:hover": {
                borderColor: "primary.main",
                bgcolor: isRegister ? "action.hover" : "primary.dark",
              },
            }}
          >
            Sign in
          </Button>

          <Button
            variant={isRegister ? "contained" : "outlined"}
            size="small"
            onClick={() => {
              setIsRegister(true);
              setErrors({});
              setSuccess("");
            }}
            sx={{
              height: 32,
              borderRadius: 2,
              textTransform: "none",
              borderColor: "primary.main",
              color: isRegister ? "primary.contrastText" : "primary.main",
              bgcolor: isRegister ? "primary.main" : "transparent",

              "&:hover": {
                borderColor: "primary.main",
                bgcolor: isRegister ? "primary.dark" : "action.hover",
              },
            }}
          >
            Register
          </Button>
        </Box>

        {/* Форма */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (isRegister) {
              handleRegister();
            } else {
              handleLogin();
            }
          }}
        >
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(errors.name)}
                helperText={errors.name}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Підсвічуємо поле ТІЛЬКИ при реєстрації
            error={isRegister && Boolean(errors.email)}
            helperText={isRegister ? errors.email : undefined}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // Підсвічуємо поле ТІЛЬКИ при реєстрації
            error={isRegister && Boolean(errors.password)}
            helperText={isRegister ? errors.password : undefined}
          />

          {isRegister && (
            <>
              <Typography component="label" sx={{ display: "block", mb: 0.5 }}>
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
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                error={Boolean(errors.repeatPassword)}
                helperText={errors.repeatPassword}
              />
            </>
          )}

          {/* Загальне повідомлення про помилку під час Sign in */}
          {!isRegister && errors.general && (
            <Typography
              sx={{
                mb: 2,
                textAlign: "center",
                fontSize: 14,
                fontWeight: 500,
                color: "error.main",
              }}
            >
              {errors.general}
            </Typography>
          )}

          {/* Успішне повідомлення */}
          {success && (
            <Typography
              sx={{
                mb: 2,
                textAlign: "center",
                fontSize: 18,
                fontWeight: 500,
                color: "success.main",
              }}
            >
              {success}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
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
            {loading
              ? isRegister
                ? "Registering..."
                : "Signing in..."
              : isRegister
                ? "Register"
                : "Sign in"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
