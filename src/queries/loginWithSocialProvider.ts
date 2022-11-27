import { graphql } from "../gql/gql";

export default graphql(`
  mutation LoginWithSocialProvider($provider: SocialProvider!, $code: String!) {
    loginWithSocialProvider(provider: $provider, code: $code) {
      token
    }
  }
`);
