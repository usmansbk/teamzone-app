import { useReactiveVar } from "@apollo/client";
import { useCallback } from "react";
import { themeVar } from "src/graphql/vars";
import { AppTheme } from "src/types";

export default function useAppTheme() {
  const appTheme = useReactiveVar(themeVar);

  const setTheme = useCallback((theme: AppTheme) => {
    localStorage.setItem("theme", theme);
    themeVar(theme);
  }, []);

  return {
    appTheme,
    setTheme,
  };
}
