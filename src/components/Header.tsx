import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import routeMap from "src/routeMap";
import ThemeButton from "./ThemeButton";

export default function Header() {
  return (
    <Stack
      flexWrap="nowrap"
      direction="row"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        variant="h1"
        color="primary"
        component={Link}
        to={routeMap.home}
        style={{ textDecoration: "none" }}
      >
        Teamzone
      </Typography>
      <ThemeButton />
    </Stack>
  );
}
