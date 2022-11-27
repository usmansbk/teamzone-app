import { createClient } from "urql";

const client = createClient({
  url: process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
});

export default client;
