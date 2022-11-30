import loginWithSocialProvider from "src/graphql/queries/loginWithSocialProvider";
import { useMutation } from "@apollo/client";
import { tokenVar } from "src/graphql/vars";

export default function useSocialLogin() {
  const [login, { data, error, loading }] = useMutation(
    loginWithSocialProvider,
    {
      onCompleted: (result) => {
        if (result.loginWithSocialProvider.token) {
          const { token } = result.loginWithSocialProvider;
          localStorage.setItem("token", token);
          tokenVar(token);
        }
      },
    }
  );

  return {
    login,
    fetching: loading,
    error,
    data: data?.loginWithSocialProvider?.token,
  };
}
