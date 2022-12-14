import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import getTimezones from "src/graphql/queries/getTimezones";

export default function useGetTimezones() {
  const { loading, data, error } = useQuery(getTimezones, {
    fetchPolicy: "cache-first",
  });

  const timezones = useMemo(() => {
    if (!data?.timezones) {
      return [];
    }
    return [...data.timezones].sort(
      (a, b) => -b.alternativeName!.localeCompare(a.alternativeName!)
    );
  }, [data]);

  return {
    loading,
    timezones,
    error,
  };
}
