import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import makeAdmin from "src/graphql/queries/makeAdmin";
import { AddTeamMemberToAdminMutationVariables } from "src/__generated__/graphql";

export default function useMakeAdmin() {
  const [mutate, { loading, data, error }] = useMutation(makeAdmin);

  const onSubmit = useCallback(
    (memberId: AddTeamMemberToAdminMutationVariables["memberId"]) =>
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
    data: data?.addTeamMemberToAdmin,
    onSubmit,
  };
}
