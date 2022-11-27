import { useCallback, useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import LoadingButton from "@mui/lab/LoadingButton";
import { Google } from "@mui/icons-material";
import toast from "react-hot-toast";
import useSocialLogin from "src/hooks/api/useSocialLogin";

export default function GoogleLoginButton() {
  const { login, data, error, fetching } = useSocialLogin();
  const [loading, setLoading] = useState(false);
  const loginWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onError: (errorResponse) => {
      setLoading(false);
      toast.error(errorResponse.error_description || "Login failed");
    },
    onSuccess: (response) => {
      setLoading(false);
      login({
        code: response.code,
        provider: "GOOGLE",
      });
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      toast.success("You've logged in!");
    }
  }, [data]);

  const onClick = useCallback(async () => {
    setLoading(true);
    loginWithGoogle();
  }, [loginWithGoogle]);

  return (
    <LoadingButton
      loading={loading || fetching}
      onClick={onClick}
      startIcon={<Google />}
      color="google"
      variant="contained"
    >
      Sign in with Google
    </LoadingButton>
  );
}
