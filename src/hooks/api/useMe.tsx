import { useQuery } from "@apollo/client";
import me from "src/graphql/queries/me";

export default function useMe() {
  const { loading, data, error, refetch } = useQuery(me);

  return {
    loading,
    data: data?.me,
    error,
    refetch,
  };
}
