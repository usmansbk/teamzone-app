import { gql } from "urql";

export default gql`
  mutation LoginWithSocialProvider($provider: SocialProvider!, $code: String!) {
    loginWithSocialProvider(provider: $provider, code: $code) {
      token
    }
  }
`;
