import { Box, Typography, Button, Stack, Link } from "@mui/material";
import ContactUsForm from "src/components/ContactUsForm";
import Footer from "src/components/Footer";

export default function Home() {
  return (
    <Box>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h1" color="primary">
            Teamzone
          </Typography>
          <Typography>Clock app for remote teams...</Typography>
        </Box>
        <Box>
          <Button size="large" variant="contained">
            Get Started
          </Button>
        </Box>
        <Box>
          <Typography variant="h4">About Teamzone</Typography>
          <Stack spacing={1}>
            <Typography>
              Teamzone is a conveinient world clock for remote teams in
              different Time zones.
            </Typography>
            <Typography>
              It lets you see the countries and times of your teammates, track
              information about their public holidays and observances, and
              schedule online meetings.
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Typography variant="h4">Time Zone Database</Typography>
          <Stack spacing={1}>
            <Typography>
              Teamzone relies on time zone data from{" "}
              <Link
                color="inherit"
                target="_blank"
                rel="noreferrer"
                href="http://www.iana.org/time-zones"
              >
                IANA Time Zone Database
              </Link>
              . We always strive keep Teamzone updated with the latest version
              of the IANA Timezone Database.
            </Typography>
            <Typography>
              Teamzone is currently using version 2022f of the IANA Time Zone
              Database.
            </Typography>
          </Stack>
        </Box>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h4">Contact Us</Typography>
            <Typography>Any feedback is appreciated!</Typography>
          </Box>
          <ContactUsForm />
        </Stack>
      </Stack>
      <Footer />
    </Box>
  );
}
