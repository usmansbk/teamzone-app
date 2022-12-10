import { gql } from "@apollo/client";

export const GET_APP_PREFERENCES = gql`
  query GetAppPreferences {
    appPreferences @client {
      is24Hour
    }
  }
`;

export default {};
