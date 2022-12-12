import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import pinTeam from "src/graphql/queries/pinTeam";

export default function usePinTeam() {
  const [mutate, { loading, data, error }] = useMutation(pinTeam);

  const onSubmit = useCallback(
    (id: string) =>
      mutate({
        variables: {
          id,
        },
      }),
    [mutate]
  );

  return {
    loading,
    data: data?.pinTeam,
    onSubmit,
    error,
  };
}
