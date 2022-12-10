import { useApolloClient, useReactiveVar } from "@apollo/client";
import { useCallback } from "react";
import { tokenVar } from "src/graphql/vars";

export default function useAuth() {
  const token = useReactiveVar(tokenVar);

  return {
    isLoggedIn: !!token,
  };
}

export function useLogout() {
  const client = useApolloClient();
  const handleLogout = useCallback(async () => {
    localStorage.removeItem("token");
    tokenVar(null);
    setTimeout(() => {
      client.clearStore();
    }, 400);
  }, []);

  return handleLogout;
}
