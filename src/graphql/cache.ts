import { InMemoryCache } from "@apollo/client";
import { AppPreferences } from "src/types";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        appPreferences: {
          merge: true,
          read(
            preferences: AppPreferences = {
              theme: "dark",
            }
          ) {
            return preferences;
          },
        },
        team: {
          read(_, { toReference, args }) {
            return toReference({
              __typename: "Team",
              id: (args as { id: string }).id,
            });
          },
        },
        user: {
          read(_, { toReference, args }) {
            return toReference({
              __typename: "User",
              id: (args as { id: string }).id,
            });
          },
        },
      },
    },
  },
});

export default cache;
