import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { Suspense, useMemo } from "react";
import getAppTheme from "src/config/theme";
import Pages from "./pages";
import "./config/i18n";

function Main() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Pages />
    </Suspense>
  );
}

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => getAppTheme(prefersDarkMode), [prefersDarkMode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Main />
    </ThemeProvider>
  );
}

export default App;
