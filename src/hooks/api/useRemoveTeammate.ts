import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import removeTeammate from "src/graphql/queries/removeTeammate";
import { RemoveTeammateMutationVariables } from "src/__generated__/graphql";

export default function useRemoveTeammate() {
  const [mutate, { loading, error, data }] = useMutation(removeTeammate);

  const onSubmit = useCallback(
    (memberId: RemoveTeammateMutationVariables["memberId"]) =>
      mutate({
        variables: {
          memberId,
        },
      }),
    [mutate]
  );

  return {
    loading,
    error,
    data: data?.removeTeammate,
    onSubmit,
  };
}
