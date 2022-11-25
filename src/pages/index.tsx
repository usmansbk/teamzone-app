import Container from "../components/Container";
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
} from "../components/Typography";

export default function Pages() {
  return (
    <Container>
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
    </Container>
  );
}
