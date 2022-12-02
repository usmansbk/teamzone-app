import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import joinTeam from "src/graphql/queries/joinTeam";
import { JoinTeamMutationVariables } from "src/__generated__/graphql";

export default function useJoinTeam() {
  const [mutate, { loading, data, error }] = useMutation(joinTeam);

  const onSubmit = useCallback(
    (inviteCode: JoinTeamMutationVariables["inviteCode"]) =>
      mutate({
        variables: {
          inviteCode,
        },
      }),
    [mutate]
  );

  return {
    loading,
    error,
    data: data?.joinTeam,
    onSubmit,
  };
}
