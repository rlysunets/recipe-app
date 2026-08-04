import Link from "next/link";

import { Box, Button, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 3,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 2,
          }}
        >
          Page not found
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mb: 4,
          }}
        >
          The page you are looking for doesn't exist or has been moved.
        </Typography>

        <Link
          href="/"
          style={{
            textDecoration: "none",
          }}
        >
          <Button variant="contained">Back to Home</Button>
        </Link>
      </Box>
    </Box>
  );
}
