import { Box, Container } from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import usePageTracking from "src/hooks/usePageTracking";

export default function Landing() {
  usePageTracking();
  return (
    <Container fixed>
      <Box height="100vh" display="flex" flexGrow={1} flexDirection="column">
        <Header />
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Outlet />
          <ScrollRestoration />
        </Box>
        <Footer />
      </Box>
    </Container>
  );
}
