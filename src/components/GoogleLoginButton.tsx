import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";

export default function GoogleLoginButton() {
  return (
    <Button startIcon={<Google />} color="google" variant="contained">
      Sign in with Google
    </Button>
  );
}
