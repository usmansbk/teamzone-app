import Logo from "@components/Logo";
import Container from "@components/Container";
import Home from "./Home";

export default function Pages() {
  return (
    <Container style={{ padding: "0 10%" }}>
      <Logo />
      <Home />
    </Container>
  );
}
