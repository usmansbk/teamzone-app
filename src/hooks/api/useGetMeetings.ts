import { useQuery } from "@apollo/client";
import getMeetings from "src/graphql/queries/getMeetings";

export default function useGetMeetings() {
  const { loading, data, error } = useQuery(getMeetings);

  return {
    loading,
    data: data?.getMeetings?.meetings,
    error,
  };
}
