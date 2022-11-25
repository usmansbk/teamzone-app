import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./config/theme";
import Pages from "./pages";

function App() {
  const mode: string = "light";
  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <Pages />
    </ThemeProvider>
  );
}

export default App;
