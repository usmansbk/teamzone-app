import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import routeMap from "src/routeMap";
import ThemeButton from "./ThemeButton";

export default function Header() {
  return (
    <>
      <AppBar enableColorOnDark position="fixed" elevation={0}>
        <Toolbar>
          <Stack
            flexWrap="nowrap"
            direction="row"
            display="flex"
            flexGrow={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h4"
              color="primary"
              component={Link}
              to={routeMap.home}
              style={{ textDecoration: "none" }}
            >
              Teamzone
            </Typography>
            <ThemeButton />
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
