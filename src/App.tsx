import { ThemeProvider } from "styled-components";
import Text from "./components/Text";
import theme from "./config/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Text variant="display">Hello World!</Text>
      <Text variant="headline">Hello World!</Text>
      <Text variant="title">Hello World!</Text>
      <Text variant="label">Hello World!</Text>
      <Text variant="body">Hello World!</Text>
      <Text variant="caption">Hello World!</Text>
    </ThemeProvider>
  );
}

export default App;
