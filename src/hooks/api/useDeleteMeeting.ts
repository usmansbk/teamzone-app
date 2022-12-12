import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import deleteMeeting from "src/graphql/queries/deleteMeeting";
import { DeleteMeetingMutationVariables } from "src/__generated__/graphql";

export default function useDeleteMeeting() {
  const [mutate, { loading, data, error }] = useMutation(deleteMeeting);

  const onSubmit = useCallback(
    (variables: DeleteMeetingMutationVariables) =>
      mutate({
        variables,
      }),
    []
  );

  return {
    loading,
    data: data?.deleteMeeting,
    error,
    onSubmit,
  };
}
