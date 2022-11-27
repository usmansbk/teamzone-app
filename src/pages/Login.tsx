import { Stack, Typography } from "@mui/material";
import GoogleLoginButton from "src/components/GoogleLoginButton";
import GitHubLoginButton from "src/components/GitHubLoginButton";

export default function Login() {
  return (
    <Stack justifyContent="center" alignItems="center" flexGrow={1} spacing={2}>
      <Typography variant="h6">Login</Typography>
      <Stack spacing={2}>
        <GoogleLoginButton />
        <GitHubLoginButton />
      </Stack>
    </Stack>
  );
}
