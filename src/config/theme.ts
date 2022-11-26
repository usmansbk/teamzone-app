import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material";
import deepmerge from "deepmerge";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#cc3355",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    h1: {
      fontFamily: "Montserrat",
      fontWeight: 900,
    },
    h2: {
      fontFamily: "Montserrat",
      fontWeight: 800,
    },
    h3: {
      fontFamily: "Montserrat",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "Montserrat",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "Montserrat",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "Montserrat",
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: "Montserrat",
      fontWeight: 700,
    },
    subtitle2: {
      fontFamily: "Montserrat",
      fontWeight: 600,
    },
    body1: {
      fontFamily: "Montserrat",
    },
    body2: {
      fontFamily: "Montserrat",
    },
    button: {
      fontFamily: "Montserrat",
      fontWeight: 600,
    },
    caption: {
      fontFamily: "Montserrat",
    },
    overline: {
      fontFamily: "Montserrat",
    },
    fontFamily: "Montserrat",
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "default",
      },
    },
  },
  shape: {
    borderRadius: 0,
  },
};

const getAppTheme = (isDark: boolean) =>
  responsiveFontSizes(
    createTheme(
      deepmerge(themeOptions, { palette: { mode: isDark ? "dark" : "light" } })
    )
  );

export default getAppTheme;
