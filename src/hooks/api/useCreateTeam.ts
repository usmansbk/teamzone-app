import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import createTeam from "src/graphql/queries/createTeam";
import { CreateTeamInput } from "src/__generated__/graphql";

export default function useCreateTeam() {
  const [mutate, { loading, data, error }] = useMutation(createTeam);

  const onSubmit = useCallback(
    (input: CreateTeamInput) =>
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
    data: data?.createTeam,
    onSubmit,
  };
}
