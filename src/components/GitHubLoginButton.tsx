import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GitHub } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function GitHubLoginButton() {
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
    if (code) {
      console.log(code);
    }
  }, [code]);

  return (
    <LoadingButton
      loading={loading}
      onClick={onClick}
      startIcon={<GitHub />}
      color="github"
      variant="contained"
    >
      Sign in with GitHub
    </LoadingButton>
  );
}
