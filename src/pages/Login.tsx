import { Button, Stack, Typography } from "@mui/material";
import { Google, GitHub } from "@mui/icons-material";

export default function Login() {
  return (
    <Stack justifyContent="center" alignItems="center" flexGrow={1} spacing={2}>
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
  );
}
