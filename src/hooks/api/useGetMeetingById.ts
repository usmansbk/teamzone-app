import { useQuery } from "@apollo/client";
import getMeetingById from "src/graphql/queries/getMeetingById";
import { QueryGetMeetingByIdArgs } from "src/__generated__/graphql";

export default function useGetMeetingById(id: QueryGetMeetingByIdArgs["id"]) {
  const { data, loading, error } = useQuery(getMeetingById, {
    variables: {
      id,
    },
  });

  return {
    loading,
    error,
    data: data?.getMeetingById,
  };
}
