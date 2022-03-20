import { ApolloClient, InMemoryCache, createHttpLink, defaultDataIdFromObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getUserToken } from "utils";

export const graphqlClient = (headerOpts = {}) => {
  // Log any GraphQL errors or network error that occurred
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getUserToken();

    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...headerOpts,
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      // typePolicies: {
      //   Subscription: {
      //     fields: {
      //       tags: {
      //         merge: (existing, incoming, { mergeObjects }) => {
      //           console.log({ existing, incoming });
      //           return incoming;
      //         },
      //       },
      //     },
      //   },
      // },
      dataIdFromObject: (o) => {
        let id = defaultDataIdFromObject(o);
        if (o.__typename === "Subscription" && id !== null) {
          id = `${id}:${o.currencyDisplay}`;
        }
        return id;
      },
    }),
    link: authLink.concat(errorLink).concat(httpLink),
    ssrMode: typeof window === "undefined",
  });
};
