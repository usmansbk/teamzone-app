import { makeVar } from "@apollo/client";
import { AppTheme } from "src/types";

export const tokenVar = makeVar<string | null>(localStorage.getItem("token"));

export const themeVar = makeVar<AppTheme | null>(
  (localStorage.getItem("theme") as AppTheme) || "system"
);

export const getAuthToken = () => tokenVar();

export const deleteAuthToken = () => {
  localStorage.removeItem("token");
  tokenVar(null);
};
