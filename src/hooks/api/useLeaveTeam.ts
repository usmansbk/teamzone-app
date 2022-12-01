import { useMutation } from "@apollo/client";
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
            cache.evict({
              id: cache.identify(response.data.leaveTeam),
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
    handleLeave,
    data: data?.leaveTeam,
  };
}
