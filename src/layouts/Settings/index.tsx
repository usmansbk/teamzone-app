import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import Header from "src/components/Header";

export default function Settings() {
  return (
    <Container fixed>
      <Box height="100vh" display="flex" flexGrow={1} flexDirection="column">
        <Header />
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Container>
  );
}
