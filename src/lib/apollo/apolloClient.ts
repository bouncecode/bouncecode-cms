import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import jwt from "jsonwebtoken";
import { PORT } from "../../../envconfig";
import { storeToken, parseCookies } from "../token";

export default function createApolloClient(initialState, ctx) {
  const uri = Boolean(ctx) ? `http://localhost:${PORT}/graphql` : "/graphql";

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
          operationName: "token",
          query: `
          mutation token(
            $token: String!
          ) {
            token(data: {
              grant_type: "refresh_token",
              refresh_token: $token
            }) {
              access_token
            }
          }
        `,
          variables: {
            token: refresh_token,
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
    const { access_token, refresh_token } = parseCookies(ctx?.req);
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
    ssrMode: Boolean(ctx),
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState),
  });
}
