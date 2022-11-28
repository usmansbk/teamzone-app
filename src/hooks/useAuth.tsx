import { useQuery } from "@apollo/client";
import { GET_AUTH_STATE } from "src/graphql/localQueries";

interface Result {
  isLoggedIn: boolean;
}
export default function useAuth() {
  const { data } = useQuery<Result>(GET_AUTH_STATE);

  return {
    isLoggedIn: data?.isLoggedIn,
  };
}
