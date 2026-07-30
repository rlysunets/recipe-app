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
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Logo
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

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
            >
              Log out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
