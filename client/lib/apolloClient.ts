import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { storeToken, parseCookies } from "client/lib/token";
import { PORT } from "../../env.config";
import jwt from "jsonwebtoken";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient;

function createApolloClient(req) {
  const isSsr = typeof window === "undefined";
  const uri = isSsr ? `http://localhost:${PORT}/graphql` : "/graphql";

  const getToken = async ({ access_token, refresh_token }) => {
    if (access_token) {
      try {
        const { exp } = jwt.decode(access_token);

        if (Date.now() < (exp - 600) * 1000) {
          return access_token;
        }
      } catch (e) {}
    }

    if (refresh_token) {
      const res = await fetch(uri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operationName: null,
          query: gql`
            mutation($refreshToken: String!) {
              refreshToken(refreshToken: $refreshToken) {
                access_token
              }
            }
          `.loc.source.body,
          variables: {
            refreshToken: refresh_token,
          },
        }),
      });

      const { data } = await res.json();
      const access_token = data.token.access_token;
      storeToken(null, { access_token });
      return access_token;
    }
  };

  const httpLink = new HttpLink({
    uri, // Server URL (must be absolute)
    credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    fetch,
  });

  const authLink = setContext(async (_, { headers }) => {
    const { access_token, refresh_token } = parseCookies(req);
    let token;

    try {
      token = await getToken({ access_token, refresh_token });
    } catch (e) {}

    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    } else {
      return { headers };
    }
  });

  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: isSsr,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null, req = null) {
  const _apolloClient = apolloClient ?? createApolloClient(req);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps, req) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state, req), [state]);
  return store;
}
