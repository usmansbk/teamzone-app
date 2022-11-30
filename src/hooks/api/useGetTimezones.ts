import { useQuery } from "@apollo/client";
import getTimezones from "src/graphql/queries/getTimezones";

export default function useGetTimezones() {
  const { loading, data, error } = useQuery(getTimezones, {
    fetchPolicy: "cache-first",
  });

  return {
    loading,
    data: data?.timezones,
    error,
  };
}
