import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import deleteMeeting from "src/graphql/queries/deleteMeeting";
import getMeetings from "src/graphql/queries/getMeetings";
import {
  DeleteMeetingMutationVariables,
  MeetingSort,
} from "src/__generated__/graphql";

export default function useDeleteMeeting() {
  const [mutate, { loading, data, error }] = useMutation(deleteMeeting);

  const onSubmit = useCallback(
    (variables: DeleteMeetingMutationVariables) =>
      mutate({
        variables,
        update(cache, result) {
          if (result.data) {
            cache.updateQuery(
              {
                query: getMeetings,
                variables: {
                  sort: MeetingSort.Upcoming,
                },
              },
              (meetingsData) => {
                if (!meetingsData) {
                  return meetingsData;
                }
                return {
                  getMeetings: {
                    ...meetingsData?.getMeetings,
                    meetings: meetingsData!.getMeetings.meetings.filter(
                      (meeting) => meeting?.id !== result.data?.deleteMeeting.id
                    ),
                  },
                };
              }
            );
            cache.updateQuery(
              {
                query: getMeetings,
                variables: {
                  sort: MeetingSort.Past,
                },
              },
              (meetingsData) => {
                if (!meetingsData) {
                  return meetingsData;
                }
                return {
                  getMeetings: {
                    ...meetingsData?.getMeetings,
                    meetings: meetingsData!.getMeetings.meetings.filter(
                      (meeting) => meeting?.id !== result.data?.deleteMeeting.id
                    ),
                  },
                };
              }
            );
          }
        },
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
