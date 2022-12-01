import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import deleteTeam from "src/graphql/queries/deleteTeam";
import { DeleteTeamMutationVariables } from "src/__generated__/graphql";

export default function useDeleteTeam() {
  const [mutate, { loading, data, error }] = useMutation(deleteTeam);

  const handleDelete = useCallback(
    (variables: DeleteTeamMutationVariables) =>
      mutate({
        variables,
        update(cache, response) {
          if (response.data?.deleteTeam) {
            cache.evict({
              id: cache.identify(response.data.deleteTeam),
            });
            cache.gc();
          }
        },
      }),
    [mutate]
  );

  return {
    loading,
    error,
    handleDelete,
    data: data?.deleteTeam,
  };
}
