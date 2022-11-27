import { useCallback, useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import LoadingButton from "@mui/lab/LoadingButton";
import { Google } from "@mui/icons-material";
import toast from "react-hot-toast";
import useSocialLogin from "src/hooks/api/useSocialLogin";
import { SocialProvider } from "src/gql/graphql";

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
        variables: {
          code: response.code,
          provider: SocialProvider.Google,
        },
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
      toast.success("You're logged in!");
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
