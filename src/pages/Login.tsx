import { Box, Button, Stack, Typography } from "@mui/material";
import { Google, GitHub } from "@mui/icons-material";
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
        <Typography variant="h6">Login</Typography>
        <Stack spacing={2}>
          <Button startIcon={<Google />} color="google" variant="contained">
            Sign in with Google
          </Button>
          <Button startIcon={<GitHub />} color="github" variant="contained">
            Sign in with GitHub
          </Button>
        </Stack>
      </Stack>
      <Footer />
    </Box>
  );
}
