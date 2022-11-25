import { DefaultTheme } from "styled-components";

const lightTheme: DefaultTheme = {
  colors: {
    primary: "#c35",
    text: "#333",
    secondary: "#c35",
    background: "#fff",
  },
};

const darkTheme: DefaultTheme = {
  colors: {
    primary: "#c35",
    text: "#fff",
    secondary: "#c35",
    background: "#222",
  },
};

const mode: string = "dark";

export default mode === "dark" ? darkTheme : lightTheme;
