import { Box, Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import useAuth from "src/hooks/useAuth";
import routeMap from "src/routeMap";

export default function Landing() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate replace to={routeMap.app} />;
  }

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
