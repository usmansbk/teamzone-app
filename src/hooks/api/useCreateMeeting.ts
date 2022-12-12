import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import createMeeting from "src/graphql/queries/createMeeting";
import { CreateMeetingInput } from "src/__generated__/graphql";

export default function useCreateMeeting() {
  const [mutate, { loading, data, error }] = useMutation(createMeeting);

  const onSubmit = useCallback(
    (input: CreateMeetingInput) =>
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
    data: data?.createMeeting,
    onSubmit,
  };
}
