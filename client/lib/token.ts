/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.lib
 */

import cookie from "cookie";
import gql from "graphql-tag";

const MUTATION_SIGNOUT = gql`
  mutation MUTATION_SIGNOUT {
    deleteAllTokens
  }
`;

/**
 * 웹브라우저에 저장되어있는 토큰을 초기화합니다.
 *
 * @author BounceCode, Inc.
 */
export const resetToken = async (client) => {
  document.cookie = cookie.serialize("access_token", "", {
    path: "/",
    maxAge: -1,
  });

  document.cookie = cookie.serialize("refresh_token", "", {
    path: "/",
    maxAge: -1,
  });

  if (client) {
    try {
      await client.mutate({ mutation: MUTATION_SIGNOUT });
    } catch (e) {}
    client.cache.reset();
    await client.reFetchObservableQueries();
  }
};

/**
 * 웹브라우저에 토큰을 저장합니다.
 *
 * @author BounceCode, Inc.
 */
export const storeToken = async (
  client,
  { access_token = undefined, refresh_token = undefined }
) => {
  if (access_token) {
    document.cookie = cookie.serialize("access_token", access_token, {
      path: "/",
    });
  }

  if (refresh_token) {
    document.cookie = cookie.serialize("refresh_token", refresh_token, {
      path: "/",
    });
  }

  if (client) {
    client.cache.reset();
    await client.reFetchObservableQueries();
  }
};

/**
 * 웹브라우저에 저장되어있는 토큰을 가져옵니다.
 *
 * @author BounceCode, Inc.
 */
export const parseCookies = (req, options = {}) => {
  const cookieData = req ? req.headers.cookie || "" : document.cookie;
  return cookie.parse(cookieData, options);
};
