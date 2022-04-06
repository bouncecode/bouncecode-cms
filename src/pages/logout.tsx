/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {useApolloClient} from '@apollo/client';
import {resetToken} from 'client/lib/token';
import Router from 'next/router';
import React, {useEffect} from 'react';

function SignInPage() {
  const client = useApolloClient();

  useEffect(() => {
    resetToken(client);
    Router.push('/');
  }, []);

  return <div />;
}

export default SignInPage;
