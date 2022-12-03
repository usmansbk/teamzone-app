import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import makeMember from "src/graphql/queries/makeMember";
import { RemoveTeamMemberFromAdminMutationVariables } from "src/__generated__/graphql";

export default function useMakeAdmin() {
  const [mutate, { loading, data, error }] = useMutation(makeMember);

  const onSubmit = useCallback(
    (memberId: RemoveTeamMemberFromAdminMutationVariables["memberId"]) =>
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
    data: data?.removeTeamMemberFromAdmin,
    onSubmit,
  };
}
