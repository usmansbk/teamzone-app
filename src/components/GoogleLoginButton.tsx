import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";

export default function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: console.log,
    onError: console.log,
  });

  const onClick = useCallback(() => {
    login();
  }, [login]);

  return (
    <Button
      onClick={onClick}
      startIcon={<Google />}
      color="google"
      variant="contained"
    >
      Sign in with Google
    </Button>
  );
}
