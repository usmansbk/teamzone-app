import { Box, Typography, Button, Stack, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ContactUsForm from "src/components/ContactUsForm";
import routeMap from "src/routeMap";

export default function Home() {
  return (
    <Stack spacing={4} flexGrow={1}>
      <Box>
        <Typography variant="h4">Clock for International Teams...</Typography>
      </Box>
      <Box>
        <Button
          size="large"
          variant="contained"
          to={routeMap.login}
          component={RouterLink}
        >
          Get Started
        </Button>
      </Box>
      <Box>
        <Typography variant="h4">About Teamzone</Typography>
        <Stack spacing={1}>
          <Typography>
            Teamzone is a conveinient world clock for remote teams in different
            Time zones.
          </Typography>
          <Typography>
            It lets you see the countries and times of your teammates.
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
              href="https://github.com/vvo/tzdb"
            >
              tzdb
            </Link>
            .
          </Typography>
          <Typography>
            Teamzone relies on sunrise and sunset data from{" "}
            <Link
              color="inherit"
              target="_blank"
              rel="noreferrer"
              href="https://sunrise-sunset.org/api"
            >
              Sunrise Sunset
            </Link>
            .
          </Typography>
        </Stack>
      </Box>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4">Contact Teamzone</Typography>
          <Typography>Any feedback is appreciated!</Typography>
        </Box>
        <ContactUsForm />
      </Stack>
    </Stack>
  );
}
