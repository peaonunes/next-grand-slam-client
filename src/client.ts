import { InMemoryCache } from "apollo-cache-inmemory";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { split } from "apollo-link";

const wsLink = new WebSocketLink({
  uri: "wss://next-grand-slam.herokuapp.com/graphql",
  options: {
    reconnect: true
  }
});
// Create an http link:
const httpLink = new HttpLink({
  uri: "https://next-grand-slam.herokuapp.com"
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export { client };
