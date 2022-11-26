import { Box, Button, Stack } from "@mui/material";
import { Google } from "@mui/icons-material";
import Footer from "src/components/Footer";
import Header from "src/components/Header";

export default function Login() {
  return (
    <Box height="100vh" display="flex" flexGrow={1} flexDirection="column">
      <Header />
      <Stack
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        spacing={2}
      >
        <Box>
          <Button startIcon={<Google />} color="google" variant="contained">
            Sign in with Google
          </Button>
        </Box>
      </Stack>
      <Footer />
    </Box>
  );
}
