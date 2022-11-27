import LoadingButton from "@mui/lab/LoadingButton";
import { Google } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";
import { useCallback, useState } from "react";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const login = useGoogleLogin({
    onError: () => setLoading(false),
    onSuccess: () => setLoading(false),
  });

  const onClick = useCallback(async () => {
    setLoading(true);
    login();
  }, [login]);

  return (
    <LoadingButton
      loading={loading}
      onClick={onClick}
      startIcon={<Google />}
      color="google"
      variant="contained"
    >
      Sign in with Google
    </LoadingButton>
  );
}
