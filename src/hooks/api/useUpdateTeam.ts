import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import updateTeam from "src/graphql/queries/updateTeam";
import { UpdateTeamMutationVariables } from "src/__generated__/graphql";

export default function useUpdateTeam() {
  const [mutate, { loading, data, error }] = useMutation(updateTeam);

  const onSubmit = useCallback(
    (input: UpdateTeamMutationVariables["input"]) =>
      mutate({
        variables: {
          input,
        },
      }),
    [mutate]
  );

  return {
    loading,
    error,
    data: data?.updateTeam,
    onSubmit,
  };
}
