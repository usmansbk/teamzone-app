import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import pinTeam from "src/graphql/queries/pinTeam";
import { Team } from "src/__generated__/graphql";

export default function usePinTeam() {
  const [mutate, { loading, data, error }] = useMutation(pinTeam);

  const onSubmit = useCallback(
    (team: Team) =>
      mutate({
        variables: {
          id: team.id,
        },
        optimisticResponse: {
          pinTeam: {
            ...team,
            isPinned: true,
          },
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
