import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import unpinTeam from "src/graphql/queries/unpinTeam";

export default function useUnpinTeam() {
  const [mutate, { loading, data, error }] = useMutation(unpinTeam);

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
    data: data?.unpinTeam,
    onSubmit,
    error,
  };
}
