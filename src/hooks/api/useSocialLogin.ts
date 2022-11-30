import loginWithSocialProvider from "src/graphql/queries/loginWithSocialProvider";
import { useMutation } from "@apollo/client";
import { tokenVar } from "src/graphql/vars";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SocialProvider } from "src/__generated__/graphql";

export default function useSocialLogin() {
  const { i18n } = useTranslation();
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const [mutate, { data, error, loading }] = useMutation(
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

  const login = useCallback(
    ({ code, provider }: { code: string; provider: SocialProvider }) =>
      mutate({
        variables: {
          input: {
            code,
            locale: i18n.language,
            timezone: timeZone,
            provider,
          },
        },
      }),
    [mutate]
  );

  return {
    login,
    fetching: loading,
    error,
    data: data?.loginWithSocialProvider?.token,
  };
}
