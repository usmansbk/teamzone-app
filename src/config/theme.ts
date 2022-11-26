import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
  Palette as ThemePalette,
  PaletteOptions as ThemePaletteOptions,
} from "@mui/material";
import deepmerge from "deepmerge";

declare module "@mui/material" {
  interface Palette {
    google: ThemePalette["primary"];
  }
  interface PaletteOptions {
    google: ThemePaletteOptions["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    google: true;
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#cc3355",
    },
    secondary: {
      main: "#cc3355",
    },
    google: {
      main: "#4285F4",
    },
  },
  typography: {
    h1: {
      fontFamily: "Montserrat",
      fontWeight: 900,
    },
    h2: {
      fontFamily: "Montserrat",
      fontWeight: 900,
    },
    h3: {
      fontFamily: "Montserrat",
      fontWeight: 900,
    },
    h4: {
      fontFamily: "Montserrat",
      fontWeight: 900,
    },
    h5: {
      fontFamily: "Montserrat",
      fontWeight: 900,
    },
    h6: {
      fontFamily: "Montserrat",
      fontWeight: 900,
    },
    subtitle1: {
      fontFamily: "Montserrat",
      fontWeight: 800,
    },
    subtitle2: {
      fontFamily: "Montserrat",
      fontWeight: 700,
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
