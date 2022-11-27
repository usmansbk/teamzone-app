import { InMemoryCache } from "@apollo/client";
import { AppTheme } from "src/types";

const cache = new InMemoryCache({
  typePolicies: {
    AppPreferences: {
      fields: {
        theme: {
          read(currentTheme: AppTheme = "system") {
            return currentTheme;
          },
        },
      },
    },
    Query: {
      fields: {
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
