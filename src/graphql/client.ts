import { ApolloClient, HttpLink, ApolloLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import toast from "react-hot-toast";
import cache from "./cache";
import { deleteAuthToken, getAuthToken } from "./vars";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = getAuthToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach?.((e) => {
      toast.error(e.message);
    });
  }
  if (networkError) {
    const err = networkError as any;
    if (err.statusCode === 401) {
      deleteAuthToken();
    }
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache,
});

export default client;
