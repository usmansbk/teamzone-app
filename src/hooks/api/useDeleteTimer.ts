import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import deleteTimer from "src/graphql/queries/deleteTimer";
import { DeleteTimerMutationVariables } from "src/__generated__/graphql";

export default function useDeleteTimer() {
  const [mutate, { loading, data, error }] = useMutation(deleteTimer);

  const onSubmit = useCallback(
    (variables: DeleteTimerMutationVariables) => {
      mutate({
        variables,
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
