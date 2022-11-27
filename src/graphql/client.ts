import { ApolloClient, HttpLink, ApolloLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import toast from "react-hot-toast";
import cache from "./cache";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_ENDPOINT,
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem("token");
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
  graphQLErrors?.forEach((e) => {
    toast.error(e.message);
  });
  if (networkError) {
    toast.error(networkError.message);
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache,
});

export default client;
