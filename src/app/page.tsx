import { Box, Container } from "@mui/material";

import { Header } from "@/components/Header";
import { MainContent } from "@/components/MainContent";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <>
      <Header />

      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            gap: 4,
            marginTop: "2px",
          }}
        >
          <Sidebar />
          <MainContent />
        </Box>
      </Container>
    </>
  );
}
