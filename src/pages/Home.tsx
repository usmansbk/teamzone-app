import Container from "@components/Container";
import { List, ListItem } from "@components/List";
import {
  Body,
  Headline1,
  Label,
  Headline2,
  SubTitle,
} from "@components/Typography";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <Container style={{ paddingTop: 20, height: "100%" }} scrollable>
      <Container style={{ gap: 40 }}>
        <section>
          <Headline1 bold>{t("home.headline")}</Headline1>
          <Label>{t("home.label")}</Label>
          <Label>Teamzone design is adapted to small screen devices</Label>
        </section>

        <section>
          <Headline2 bold>{t("home.about_teamzone")}</Headline2>
          <Container style={{ gap: 24 }}>
            <section>
              <SubTitle bold>{t("On teamzone you can:")}</SubTitle>
              <List>
                <ListItem>
                  <Body>
                    Easily track the country of residence and local time of your
                    teammates (or staff)
                  </Body>
                </ListItem>
                <ListItem>
                  <Body>Track their sunrise and sunset times</Body>
                </ListItem>
                <ListItem>
                  <Body>
                    Information about their public holidays and observances
                  </Body>
                </ListItem>
              </List>
            </section>
            <section>
              <SubTitle bold>{t("You will also find:")}</SubTitle>
              <List>
                <ListItem>
                  <Body>Calendar / Event scheduler</Body>
                </ListItem>
                <ListItem>
                  <Body>Group Timer</Body>
                </ListItem>
              </List>
            </section>
            <section>
              <SubTitle bold>{t("Time Zone Database")}</SubTitle>
              <Body>
                Teamzone relies on time zone data from{" "}
                <a href="https://www.iana.org/time-zones">
                  IANA Time Zone Database
                </a>
                . We always strive to keep Teamzone updated with the latest
                version of the IANA Time Zone Database.
              </Body>
            </section>
          </Container>
        </section>
      </Container>
    </Container>
  );
}
