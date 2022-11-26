import { Box, Stack, Typography, Button } from "@mui/material";
// import { Link } from "react-router-dom";
import routeMap from "src/routeMap";
import NavLink from "./NavLink";

export default function Footer() {
  return (
    <Box py={4} display="flex" justifyContent="center">
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <Typography variant="caption">
          &copy; {new Date().getFullYear()} Teamzone
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          <Button
            href="https://github.com/usmansbk"
            target="_blank"
            rel="noreferrer"
            size="small"
          >
            GitHub
          </Button>
          <Button
            size="small"
            component={NavLink}
            to={routeMap.terms}
            sx={{
              "&.active": () => ({
                fontWeight: 800,
              }),
            }}
          >
            Terms & Privacy
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
