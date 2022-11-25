import Container from "@components/Container";
import {
  Body2,
  Headline1,
  Label,
  Link,
  Headline2,
} from "@components/Typography";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <Container style={{ padding: 20 }}>
      <div style={{ gap: 40, display: "flex", flexDirection: "column" }}>
        <div>
          <Headline1 bold>{t("home.headline")}</Headline1>
          <Label>{t("home.label")}</Label>
        </div>

        <div>
          <Label bold>Getting Started</Label>
          <Link href="#login">
            <Headline2 bold>Login</Headline2>
          </Link>
          <ol>
            <li>
              <Body2>Join a Team</Body2>
            </li>
            <li>
              <Body2>See your teammates local time</Body2>
            </li>
          </ol>
        </div>
      </div>
    </Container>
  );
}
