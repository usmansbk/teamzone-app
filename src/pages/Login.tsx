import { Box, Button, Stack, Typography } from "@mui/material";
import Footer from "src/components/Footer";

export default function Login() {
  return (
    <Box height="100vh" display="flex" flexGrow={1} flexDirection="column">
      <Stack
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        spacing={2}
      >
        <Typography variant="h1" color="primary">
          Teamzone
        </Typography>
        <Box>
          <Button color="google" variant="contained">
            Sign in with Google
          </Button>
        </Box>
      </Stack>
      <Footer />
    </Box>
  );
}
