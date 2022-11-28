import { gql } from "@apollo/client";

export const GET_APP_PREFERENCES = gql`
  query GetAppPreferences {
    appPreferences @client {
      theme
    }
  }
`;

export const GET_AUTH_STATE = gql`
  query GetAuth {
    isLoggedIn @client
  }
`;
