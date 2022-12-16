import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import getMeetings from "src/graphql/queries/getMeetings";
import dayjs from "src/utils/dateTime";
import { GetMeetingsQueryVariables } from "src/__generated__/graphql";

export default function useGetMeetings(variables: GetMeetingsQueryVariables) {
  const { loading, data, error } = useQuery(getMeetings, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  const meetings = useMemo(() => {
    if (data?.getMeetings) {
      return [...data.getMeetings.meetings].sort((a, b) =>
        dayjs.utc(a?.from).diff(dayjs(b?.from))
      );
    }
    return [];
  }, [data?.getMeetings]);

  return {
    loading,
    meetings,
    error,
  };
}
