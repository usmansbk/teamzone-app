import { useMutation, Reference } from "@apollo/client";
import { useCallback } from "react";
import deleteTeam from "src/graphql/queries/deleteTeam";
import { DeleteTeamMutationVariables } from "src/__generated__/graphql";
import useMe from "./useMe";

export default function useDeleteTeam() {
  const [mutate, { loading, data, error }] = useMutation(deleteTeam);
  const { data: me } = useMe();

  const handleDelete = useCallback(
    (variables: DeleteTeamMutationVariables) =>
      mutate({
        variables,
        update(cache, response) {
          if (response.data?.deleteTeam) {
            const deleteTeamData = response.data.deleteTeam;
            cache.modify({
              id: cache.identify(me!),
              fields: {
                teams(existingRefs: Reference[], { readField }) {
                  return existingRefs?.filter(
                    (ref: Reference) =>
                      readField("id", ref) !== deleteTeamData.id
                  );
                },
                createdTeams(existingRefs: Reference[], { readField }) {
                  return existingRefs?.filter(
                    (ref: Reference) =>
                      readField("id", ref) !== deleteTeamData.id
                  );
                },
              },
            });
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
