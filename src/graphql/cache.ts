import { InMemoryCache } from "@apollo/client";
import { AppPreferences } from "src/types";
import { tokenVar } from "./vars";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return !!tokenVar();
          },
        },
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
