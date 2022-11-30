import { useApolloClient, useQuery } from "@apollo/client";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { persistor } from "src/graphql/client";
import { GET_AUTH_STATE } from "src/graphql/localQueries";
import { tokenVar } from "src/graphql/vars";
import routeMap from "src/routeMap";

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
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await persistor.purge();
    await client.clearStore();
    localStorage.removeItem("token");
    tokenVar(null);
    navigate(routeMap.home);
  }, []);

  return handleLogout;
}
