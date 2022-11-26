import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  LinearProgress,
  Container,
} from "@mui/material";
import { Suspense, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import getAppTheme from "src/config/theme";
import router from "./pages/router";
import "./config/i18n";

function Main() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Container fixed>
        <RouterProvider router={router} />
      </Container>
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
