import { gql } from "@apollo/client";

export const GET_APP_PREFERENCES = gql`
  {
    appPreferences @client {
      theme
    }
  }
`;

export default {};
