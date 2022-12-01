import { useMutation, Reference } from "@apollo/client";
import { useCallback } from "react";
import leaveTeam from "src/graphql/queries/leaveTeam";
import { LeaveTeamMutationVariables } from "src/__generated__/graphql";

export default function useLeaveTeam() {
  const [mutate, { loading, data, error }] = useMutation(leaveTeam);

  const handleLeave = useCallback(
    (variables: LeaveTeamMutationVariables) =>
      mutate({
        variables,
        update(cache, response) {
          if (response.data?.leaveTeam) {
            const { leaveTeam: leaveTeamData } = response.data;
            cache.modify({
              id: cache.identify({
                __typename: "User",
                id: leaveTeamData.memberId,
              }),
              fields: {
                teams(existingRefs: Reference[], { readField }) {
                  return existingRefs?.filter(
                    (ref: Reference) =>
                      readField("id", ref) !== leaveTeamData.teamId
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
