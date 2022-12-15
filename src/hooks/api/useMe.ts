import { useQuery } from "@apollo/client";
import me from "src/graphql/queries/me";
import { setDefaultTimezone } from "src/utils/dateTime";

export default function useMe() {
  const { loading, data, error, refetch } = useQuery(me, {
    fetchPolicy: "cache-first",
    onCompleted: (result) => {
      if (result.me.timezone) {
        setDefaultTimezone(result.me.timezone);
      }
    },
  });

  return {
    loading,
    data: data?.me,
    error,
    refetch,
  };
}
