import { InMemoryCache, Reference } from "@apollo/client";
import { AppPreferences } from "src/types";

const cache = new InMemoryCache({
  typePolicies: {
    TimezoneData: {
      keyFields: ["name"],
    },
    User: {
      fields: {
        teams: {
          merge(_existing, incoming: Reference[] = []) {
            return incoming;
          },
        },
      },
    },
    Query: {
      fields: {
        appPreferences: {
          merge: true,
          read(
            preferences: AppPreferences = {
              is24Hour: true,
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
