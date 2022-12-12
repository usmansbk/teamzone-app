import { useQuery } from "@apollo/client";
import getTeamPreview from "src/graphql/queries/getTeamPreview";

export default function useGetTeamPreviewByCode(code: string) {
  const { loading, data, error } = useQuery(getTeamPreview, {
    variables: {
      code,
    },
  });

  return {
    loading,
    data: data?.getTeamPreviewByCode,
    error,
  };
}
