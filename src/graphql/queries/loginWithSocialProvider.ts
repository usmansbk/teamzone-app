import { gql } from "src/__generated__";

export default gql(`
  mutation LoginWithSocialProvider($provider: SocialProvider!, $code: String!) {
    loginWithSocialProvider(provider: $provider, code: $code) {
      token
    }
  }
`);
