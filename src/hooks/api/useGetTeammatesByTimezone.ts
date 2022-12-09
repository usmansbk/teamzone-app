import { useQuery } from "@apollo/client";
import {
  GetTeammatesByTimezoneDocument,
  GetTeammatesByTimezoneQueryVariables,
} from "src/__generated__/graphql";

export default function useGetTeammatesByTimezone(
  id: GetTeammatesByTimezoneQueryVariables["id"]
) {
  const { loading, error, data } = useQuery(GetTeammatesByTimezoneDocument, {
    variables: {
      id,
    },
    fetchPolicy: "cache-first",
  });

  return {
    loading,
    error,
    data: data?.getTeammatesByTimezone,
  };
}
