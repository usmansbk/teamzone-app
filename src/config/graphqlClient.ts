import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
