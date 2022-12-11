import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
  Palette as ThemePalette,
  PaletteOptions as ThemePaletteOptions,
} from "@mui/material";
import deepmerge from "deepmerge";
import type {} from "@mui/lab/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";

declare module "@mui/material" {
  interface Palette {
    google: ThemePalette["primary"];
    github: ThemePalette["primary"];
  }
  interface PaletteOptions {
    google: ThemePaletteOptions["primary"];
    github: ThemePaletteOptions["primary"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    google: true;
    github: true;
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#468e91",
    },
    secondary: {
      main: "#cc3355",
    },
    google: {
      main: "#4285F4",
      contrastText: "white",
    },
    github: {
      main: "#444444",
      contrastText: "white",
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
        color: "inherit",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        sx: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          sx: {
            fontWeight: 900,
          },
        },
        InputLabelProps: {
          sx: {
            fontWeight: 800,
          },
        },
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
