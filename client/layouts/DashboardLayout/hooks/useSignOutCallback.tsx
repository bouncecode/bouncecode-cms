/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {useCallback} from 'react';
import Router from 'next/router';
// import {useApolloClient} from '@apollo/client';
// import {resetToken} from 'client/lib/token';

/**
 * 로그아웃합니다.
 *
 * @author BounceCode, Inc.
 */
export function useSignOutCallback() {
  // const client = useApolloClient();

  return useCallback(() => {
    // resetToken(client);
    Router.push('/logout');
  }, []);
}
