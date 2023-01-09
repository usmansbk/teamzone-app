import { InMemoryCache, Reference } from "@apollo/client";
import { AppPreferences } from "src/types";
import { getTimezoneDateTimeFromUTC } from "src/utils/dateTime";

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
    Timer: {
      fields: {
        dateTime: {
          read(dateTime, { readField }) {
            return getTimezoneDateTimeFromUTC(
              dateTime,
              readField("timezone") as string
            );
          },
        },
        startAt: {
          read(startAt, { readField }) {
            return getTimezoneDateTimeFromUTC(
              startAt,
              readField("timezone") as string
            );
          },
        },
      },
    },
    Meeting: {
      fields: {
        from: {
          read(from, { readField }) {
            return getTimezoneDateTimeFromUTC(
              from,
              readField("timezone") as string
            );
          },
        },
        to: {
          read(to, { readField }) {
            return getTimezoneDateTimeFromUTC(
              to,
              readField("timezone") as string
            );
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
        getTimerById: {
          read(_, { toReference, args }) {
            return toReference({
              __typename: "Timer",
              id: (args as { id: string }).id,
            });
          },
        },
      },
    },
  },
});

export default cache;
