import { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./config/theme";
import Pages from "./pages";
import "./config/i18n";

function App() {
  const mode: string = "light";
  return (
    <Suspense fallback="Loading">
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <Pages />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
