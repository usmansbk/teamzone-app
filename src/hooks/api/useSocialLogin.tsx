import loginWithSocialProvider from "src/graphql/queries/loginWithSocialProvider";
import { useMutation } from "urql";

interface Result {
  loginWithSocialProvider: {
    token: string;
  };
}

interface Variables {
  provider: "GOOGLE" | "GITHUB";
  code: string;
}

export default function useSocialLogin() {
  const [{ data, error, fetching }, login] = useMutation<Result, Variables>(
    loginWithSocialProvider
  );

  return {
    login,
    fetching,
    error,
    data: data?.loginWithSocialProvider?.token,
  };
}
