import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import useAppPreferences from "src/hooks/useAppPreferences";
import routeMap from "src/routeMap";

export default function Header() {
  const { palette } = useTheme();
  const { setTheme } = useAppPreferences();

  const toggleTheme = useCallback(() => {
    setTheme(palette.mode === "dark" ? "light" : "dark");
  }, [palette.mode]);

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
      <IconButton onClick={toggleTheme}>
        {palette.mode === "dark" ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Stack>
  );
}
