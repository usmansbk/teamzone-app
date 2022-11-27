import { GitHub } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function GitHubLoginButton() {
  return (
    <Button startIcon={<GitHub />} color="github" variant="contained">
      Sign in with GitHub
    </Button>
  );
}
