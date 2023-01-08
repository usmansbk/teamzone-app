import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import createTimer from "src/graphql/queries/createTimer";
import getTimers from "src/graphql/queries/getTimers";
import { CreateTimerInput, TimerState } from "src/__generated__/graphql";

export default function useCreateTimer() {
  const [mutate, { loading, error, data }] = useMutation(createTimer);

  const onSubmit = useCallback(
    (input: CreateTimerInput) => {
      mutate({
        variables: {
          input,
        },
        update(cache, result) {
          const { data: resultData } = result;
          if (resultData?.createTimer) {
            const { createTimer: newTimer } = resultData;
            cache.updateQuery(
              {
                query: getTimers,
                variables: {
                  state: TimerState.Active,
                },
              },
              (getTimersData) => {
                if (!getTimersData) {
                  return getTimersData;
                }
                return {
                  getTimers: {
                    ...getTimersData?.getTimers,
                    timers: [...getTimersData!.getTimers.timers, newTimer],
                  },
                };
              }
            );
          }
        },
      });
    },
    [mutate]
  );

  return {
    loading,
    error,
    onSubmit,
    data: data?.createTimer,
  };
}
