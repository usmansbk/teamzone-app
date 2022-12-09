import { useQuery } from "@apollo/client";
import {
  GetTimezoneByIdDocument,
  GetTimezoneByIdQueryVariables,
} from "src/__generated__/graphql";

export default function useGetTimezoneById(
  id: GetTimezoneByIdQueryVariables["id"]
) {
  const { loading, error, data, refetch } = useQuery(GetTimezoneByIdDocument, {
    variables: {
      id,
    },
    fetchPolicy: "cache-first",
  });

  return {
    loading,
    error,
    data: data?.getTimezoneById,
    refetch,
  };
}
