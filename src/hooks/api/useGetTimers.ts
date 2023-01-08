import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import getTimers from "src/graphql/queries/getTimers";
import { TimerState } from "src/__generated__/graphql";

export default function useGetTimers(state = TimerState.Active) {
  const { loading, data, error, refetch } = useQuery(getTimers, {
    variables: {
      state,
    },
    fetchPolicy: "cache-first",
  });

  const timers = useMemo(() => data?.getTimers.timers, [data]);

  return {
    loading,
    data: timers,
    error,
    refetch,
  };
}
