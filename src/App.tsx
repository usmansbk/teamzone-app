import { ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useMemo } from "react";
import getAppTheme from "src/config/theme";
import client from "./graphql/client";
import useAppTheme from "./hooks/useAppTheme";
import Pages from "./pages";

function Main() {
  const { appTheme } = useAppTheme();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      getAppTheme(
        appTheme === "system" ? prefersDarkMode : appTheme === "dark"
      ),
    [prefersDarkMode, appTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Pages />
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

export default App;
