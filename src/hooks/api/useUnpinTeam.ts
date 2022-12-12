import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import unpinTeam from "src/graphql/queries/unpinTeam";
import { Team } from "src/__generated__/graphql";

export default function useUnpinTeam() {
  const [mutate, { loading, data, error }] = useMutation(unpinTeam);

  const onSubmit = useCallback(
    (team: Team) =>
      mutate({
        variables: {
          id: team.id,
        },
        optimisticResponse: {
          unpinTeam: {
            ...team,
            isPinned: false,
          },
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
