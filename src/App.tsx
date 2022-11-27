import { ApolloProvider } from "@apollo/client";
import {
  CssBaseline,
  LinearProgress,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useMemo, useState } from "react";
import getAppTheme from "src/config/theme";
import client, { persistor } from "./graphql/client";
import Pages from "./pages";

function Main() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => getAppTheme(prefersDarkMode), [prefersDarkMode]);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      await persistor.restore();
      setLoading(false);
    }

    init();
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

export default App;
