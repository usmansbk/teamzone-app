import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import Header from "src/components/Header";

export default function Landing() {
  return (
    <Container fixed>
      <Box height="100vh" display="flex" flexGrow={1} flexDirection="column">
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </Container>
  );
}
