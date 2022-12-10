import { useQuery } from "@apollo/client";
import { GET_APP_PREFERENCES } from "src/graphql/localQueries";
import { AppPreferences } from "src/types";

interface Result {
  appPreferences: AppPreferences;
}
export default function useAppPreferences() {
  const { data } = useQuery<Result>(GET_APP_PREFERENCES);

  return {
    preferences: data?.appPreferences,
  };
}
