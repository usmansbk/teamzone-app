import { ThemeProvider } from "styled-components";
import theme from "./config/theme";
import Pages from "./pages";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Pages />
    </ThemeProvider>
  );
}

export default App;
