import { useCallback, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import LoadingButton from "@mui/lab/LoadingButton";
import { Google } from "@mui/icons-material";
import toast from "react-hot-toast";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const login = useGoogleLogin({
    flow: "auth-code",
    onError: () => {
      setLoading(false);
      toast.error("Failed");
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("Success");
    },
  });

  const onClick = useCallback(async () => {
    toast.error("Success");
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
