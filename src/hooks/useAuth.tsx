import { useApolloClient, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { GET_AUTH_STATE } from "src/graphql/localQueries";
import { tokenVar } from "src/graphql/vars";

interface Result {
  isLoggedIn: boolean;
}
export default function useAuth() {
  const { data } = useQuery<Result>(GET_AUTH_STATE);

  return {
    isLoggedIn: data?.isLoggedIn,
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
