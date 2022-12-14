import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import getMeetings from "src/graphql/queries/getMeetings";
import dayjs from "src/utils/dateTime";

export default function useGetMeetings() {
  const { loading, data, error } = useQuery(getMeetings);

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
