import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import createMeeting from "src/graphql/queries/createMeeting";
import getMeetings from "src/graphql/queries/getMeetings";
import { CreateMeetingInput } from "src/__generated__/graphql";

export default function useCreateMeeting() {
  const [mutate, { loading, data, error }] = useMutation(createMeeting);

  const onSubmit = useCallback(
    (input: CreateMeetingInput) =>
      mutate({
        variables: {
          input,
        },
        update(cache, result) {
          const { data: resultData } = result;
          if (resultData?.createMeeting) {
            const { createMeeting: newMeeting } = resultData;
            cache.updateQuery(
              {
                query: getMeetings,
              },
              (getMeetingsData) => ({
                getMeetings: {
                  meetings: [
                    ...getMeetingsData!.getMeetings.meetings,
                    newMeeting,
                  ],
                },
              })
            );
          }
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
