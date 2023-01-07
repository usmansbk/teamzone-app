import { useQuery } from "@apollo/client";
import getTimerById from "src/graphql/queries/getTimerById";
import { GetTimerByIdQueryVariables } from "src/__generated__/graphql";

export default function useGetTimerById(id: GetTimerByIdQueryVariables["id"]) {
  const { loading, data, error, refetch } = useQuery(getTimerById, {
    variables: {
      id,
    },
  });

  return {
    loading,
    data: data?.getTimerById,
    error,
    refetch,
  };
}
