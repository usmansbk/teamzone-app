import loginWithSocialProvider from "src/queries/loginWithSocialProvider";
import { useMutation } from "urql";

export default function useSocialLogin() {
  const [{ data, error, fetching }, login] = useMutation(
    loginWithSocialProvider
  );

  return {
    login,
    fetching,
    error,
    data: data?.loginWithSocialProvider?.token,
  };
}
