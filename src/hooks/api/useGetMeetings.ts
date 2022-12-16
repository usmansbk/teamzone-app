import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import getMeetings from "src/graphql/queries/getMeetings";
import dayjs from "src/utils/dateTime";
import {
  GetMeetingsQueryVariables,
  MeetingSort,
} from "src/__generated__/graphql";

export default function useGetMeetings(variables: GetMeetingsQueryVariables) {
  const { loading, data, error } = useQuery(getMeetings, {
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  const meetings = useMemo(() => {
    if (data?.getMeetings) {
      return [...data.getMeetings.meetings].sort((a, b) => {
        const diff = dayjs.utc(a?.from).diff(dayjs(b?.from));
        if (variables.sort === MeetingSort.Upcoming) {
          return diff;
        }
        return -diff;
      });
    }
    return [];
  }, [data?.getMeetings, variables.sort]);

  return {
    loading,
    meetings,
    error,
  };
}
