import { ThemeProvider } from "styled-components";
import {
  Body1,
  Body2,
  Caption,
  Display,
  Headline1,
  Headline2,
  Label,
  SubTitle,
  Title,
} from "./components/Typography";
import theme from "./config/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Display>Display</Display>
      <Headline1>Headline1</Headline1>
      <Headline2>Headline2</Headline2>
      <Title>Title</Title>
      <SubTitle>Subtitle</SubTitle>
      <Body1>Summer time started</Body1>
      <Body2>Body2</Body2>
      <Label bold>LabelBold</Label>
      <Label>LabelLight</Label>
      <Caption>Caption</Caption>
    </ThemeProvider>
  );
}

export default App;
