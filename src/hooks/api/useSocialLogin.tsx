import loginWithSocialProvider from "src/queries/loginWithSocialProvider";
import { useMutation } from "@apollo/client";

export default function useSocialLogin() {
  const [login, { data, error, loading }] = useMutation(
    loginWithSocialProvider
  );

  return {
    login,
    fetching: loading,
    error,
    data: data?.loginWithSocialProvider?.token,
  };
}
