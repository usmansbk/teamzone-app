import { useMutation, Reference } from "@apollo/client";
import { useCallback } from "react";
import leaveTeam from "src/graphql/queries/leaveTeam";
import { LeaveTeamMutationVariables } from "src/__generated__/graphql";
import useMe from "./useMe";

export default function useLeaveTeam() {
  const [mutate, { loading, data, error }] = useMutation(leaveTeam);
  const { data: me } = useMe();

  const handleLeave = useCallback(
    (variables: LeaveTeamMutationVariables) =>
      mutate({
        variables,
        update(cache, response) {
          if (response.data?.leaveTeam) {
            const { leaveTeam: leaveTeamData } = response.data;
            cache.modify({
              id: cache.identify(me!),
              fields: {
                teams(existingRefs: Reference[], { readField }) {
                  return existingRefs?.filter(
                    (ref: Reference) =>
                      readField("id", ref) !== leaveTeamData.id
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
    handleLeave,
    data: data?.leaveTeam,
  };
}
