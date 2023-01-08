import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import deleteTimer from "src/graphql/queries/deleteTimer";
import getTimers from "src/graphql/queries/getTimers";
import {
  DeleteTimerMutationVariables,
  TimerState,
} from "src/__generated__/graphql";

export default function useDeleteTimer() {
  const [mutate, { loading, data, error }] = useMutation(deleteTimer);

  const onSubmit = useCallback(
    (variables: DeleteTimerMutationVariables) => {
      mutate({
        variables,
        update(cache, result) {
          if (result.data) {
            cache.updateQuery(
              {
                query: getTimers,
                variables: {
                  state: TimerState.Active,
                },
              },
              (timersData) => {
                if (!timersData) {
                  return timersData;
                }
                return {
                  getTimers: {
                    ...timersData?.getTimers,
                    timers: timersData!.getTimers.timers.filter(
                      (timer) => timer?.id !== result.data?.deleteTimer.id
                    ),
                  },
                };
              }
            );
            cache.updateQuery(
              {
                query: getTimers,
                variables: {
                  state: TimerState.Inactive,
                },
              },
              (timersData) => {
                if (!timersData) {
                  return timersData;
                }
                return {
                  getTimers: {
                    ...timersData?.getTimers,
                    timers: timersData!.getTimers.timers.filter(
                      (timer) => timer?.id !== result.data?.deleteTimer.id
                    ),
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
    data: data?.deleteTimer,
    onSubmit,
  };
}
