/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.lib.apollo
 */

import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import fetch from 'isomorphic-unfetch';
import jwt from 'jsonwebtoken';
import {PORT} from '../../../env.config';
import {storeToken, parseCookies} from 'client/lib/token';
import gql from 'graphql-tag';

/**
 * ApolloClient 를 만들기 위한 함수입니다.
 *
 * @author BounceCode, Inc.
 */
function createApolloClient(initialState, ctx) {
  const uri = Boolean(ctx) ? `http://localhost:${PORT}/graphql` : '/graphql';

  const getToken = async ({access_token, refresh_token}) => {
    if (access_token) {
      try {
        const {exp}: any = jwt.decode(access_token);

        if (Date.now() < (exp - 600) * 1000) {
          return access_token;
        }
      } catch (e) {}
    }

    if (refresh_token) {
      const res = await fetch(uri, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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

      const {data} = await res.json();
      const access_token = data.token.access_token;
      storeToken(null, {access_token});
      return access_token;
    }
  };

  const httpLink = new HttpLink({
    uri, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch,
  });

  const authLink = setContext(async (_, {headers}) => {
    const {access_token, refresh_token} = parseCookies(ctx?.req);
    let token;

    try {
      token = await getToken({access_token, refresh_token});
    } catch (e) {}

    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    } else {
      return {headers};
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

export default createApolloClient;
