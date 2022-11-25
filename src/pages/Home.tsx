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
    <Container style={{ paddingTop: 20 }}>
      <div style={{ gap: 40, display: "flex", flexDirection: "column" }}>
        <section>
          <Headline1 bold>{t("home.headline")}</Headline1>
          <Label>{t("home.label")}</Label>
        </section>

        <section>
          <Label bold>{t("home.getting_started")}</Label>
          <Link href="#login">
            <Headline2 bold>{t("button.login")}</Headline2>
          </Link>
          <Body2>{t("home.join_team")}</Body2>
        </section>

        <section>
          <Headline2 bold>{t("home.about_teamzone")}</Headline2>
        </section>
      </div>
    </Container>
  );
}
