import { InMemoryCache, Reference } from "@apollo/client";
import { AppPreferences } from "src/types";
import { getTimezoneDateTime } from "src/utils/dateTime";

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
    Meeting: {
      fields: {
        from: {
          read(from, { readField }) {
            return getTimezoneDateTime(from, readField("timezone") as string);
          },
        },
        to: {
          read(to, { readField }) {
            return getTimezoneDateTime(to, readField("timezone") as string);
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
        getMeetingById: {
          read(_, { toReference, args }) {
            return toReference({
              __typename: "Meeting",
              id: (args as { id: string }).id,
            });
          },
        },
        getTimezoneById: {
          read(_, { toReference, args }) {
            return toReference({
              __typename: "TimezoneData",
              name: (args as { id: string }).id,
            });
          },
        },
        getTeamById: {
          read(_, { toReference, args }) {
            return toReference({
              __typename: "Team",
              id: (args as { id: string }).id,
            });
          },
        },
      },
    },
  },
});

export default cache;
