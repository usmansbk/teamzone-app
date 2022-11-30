import { useQuery } from "@apollo/client";
import { useCallback } from "react";
import { GET_APP_PREFERENCES } from "src/graphql/localQueries";
import { AppPreferences, AppTheme } from "src/types";

interface Result {
  appPreferences: AppPreferences;
}
export default function useAppPreferences() {
  const { data, client } = useQuery<Result>(GET_APP_PREFERENCES);

  const setTheme = useCallback(
    (theme: AppTheme) =>
      client.cache.updateQuery<Result>(
        {
          query: GET_APP_PREFERENCES,
        },
        (appData) => ({
          appPreferences: { ...appData?.appPreferences, theme },
        })
      ),
    [client.cache]
  );

  return {
    preferences: data?.appPreferences,
    setTheme,
  };
}
