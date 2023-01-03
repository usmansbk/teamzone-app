import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import createTimer from "src/graphql/queries/createTimer";
import { CreateTimerInput } from "src/__generated__/graphql";

export default function useCreateTimer() {
  const [mutate, { loading, error, data }] = useMutation(createTimer);

  const onSubmit = useCallback(
    (input: CreateTimerInput) => {
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
    onSubmit,
    data: data?.createTimer,
  };
}
