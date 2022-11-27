declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GOOGLE_CLIENT_ID: string;
      REACT_APP_GITHUB_CLIENT_ID: string;
      REACT_APP_GRAPHQL_API_ENDPOINT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
