import { useReactiveVar } from "@apollo/client";
import { useCallback } from "react";
import { tokenVar } from "src/graphql/vars";

export default function useAuth() {
  const token = useReactiveVar(tokenVar);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    tokenVar(null);
  }, []);

  return {
    isLoggedIn: !!token,
    logout,
  };
}
