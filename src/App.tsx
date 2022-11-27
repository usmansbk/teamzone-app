import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useMemo } from "react";
import getAppTheme from "src/config/theme";
import Main from "./pages";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => getAppTheme(prefersDarkMode), [prefersDarkMode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Main />
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
