import { MutationLoginWithSocialProviderArgs } from "src/gql/graphql";
import loginWithSocialProvider from "src/graphql/queries/loginWithSocialProvider";
import { useMutation } from "urql";

interface Result {
  loginWithSocialProvider: {
    token: string;
  };
}

export default function useSocialLogin() {
  const [{ data, error, fetching }, login] = useMutation<
    Result,
    MutationLoginWithSocialProviderArgs
  >(loginWithSocialProvider);

  return {
    login,
    fetching,
    error,
    data: data?.loginWithSocialProvider?.token,
  };
}
