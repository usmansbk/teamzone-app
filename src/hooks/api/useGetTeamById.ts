import { useQuery } from "@apollo/client";
import getTeamById from "src/graphql/queries/getTeamById";

export default function useGetTeamById(id: string) {
  const { loading, error, data, refetch } = useQuery(getTeamById, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
    variables: {
      id,
    },
  });

  return {
    loading,
    error,
    refetch,
    data: data?.getTeamById,
  };
}
