import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import updateTimer from "src/graphql/queries/updateTimer";
import { UpdateTimerInput } from "src/__generated__/graphql";

export default function useUpdateTimer() {
  const [mutate, { loading, data, error }] = useMutation(updateTimer);

  const onSubmit = useCallback(
    (input: UpdateTimerInput) => {
      mutate({
        variables: {
          input,
        },
      });
    },
    [mutate]
  );

  return {
    loading,
    error,
    data: data?.updateTimer,
    onSubmit,
  };
}
