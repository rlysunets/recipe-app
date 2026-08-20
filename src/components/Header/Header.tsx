"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch {
        setIsLoggedIn(false);
      }
    }

    checkAuth();
  }, [pathname]);

  async function handleAuthAction() {
    if (isLoggedIn) {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        setIsLoggedIn(false);
        // router.push("/login");
        router.refresh();
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      router.push("/login");
    }
  }

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
      sx={{
        bgcolor: "grey.100",
        color: "text.primary",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters={true}
          sx={{
            height: 74,
          }}
        >
          <Link
            href="/"
            style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Image
                src="/logo.svg"
                alt="RecipeBook Logo"
                width={40}
                height={40}
              />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Recipe
                <Box component="span" sx={{ color: "primary.main" }}>
                  Book
                </Box>
              </Typography>
            </Box>
          </Link>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              color="inherit"
              startIcon={<FavoriteBorderIcon />}
              sx={{ textTransform: "none" }}
            >
              My list
            </Button>

            <Button
              color="inherit"
              startIcon={<AddIcon />}
              sx={{ textTransform: "none" }}
            >
              Add new
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
              }}
              onClick={handleAuthAction}
            >
              {isLoggedIn ? "Log out" : "Log in"}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
