import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import {
  UpdateMeetingDocument,
  UpdateMeetingInput,
} from "src/__generated__/graphql";

export default function useUpdateMeeting() {
  const [mutate, { loading, data, error }] = useMutation(UpdateMeetingDocument);

  const onSubmit = useCallback(
    (input: UpdateMeetingInput) =>
      mutate({
        variables: {
          input,
        },
      }),
    [mutate]
  );

  return {
    loading,
    data: data?.updateMeeting,
    error,
    onSubmit,
  };
}
