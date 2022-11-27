import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GitHub } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import useSocialLogin from "src/hooks/api/useSocialLogin";
import { SocialProvider } from "src/gql/graphql";

export default function GitHubLoginButton() {
  const { fetching, login, error, data } = useSocialLogin();
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const code = params.get("code");

  const onClick = useCallback(() => {
    setLoading(true);
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    );
  }, []);

  useEffect(() => {
    if (data) {
      toast.success("You're logged in!");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (code) {
      login({
        code,
        provider: SocialProvider.Github,
      });
    }
  }, [code]);

  return (
    <LoadingButton
      loading={loading || fetching}
      onClick={onClick}
      startIcon={<GitHub />}
      color="github"
      variant="contained"
    >
      Sign in with GitHub
    </LoadingButton>
  );
}
