/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {useApolloClient} from '@apollo/client';
import {useCreateTokenMutation} from 'client/generated/graphql';
import {storeToken} from 'client/lib/token';
import Router from 'next/router';
import {useSnackbar} from 'notistack';
import React from 'react';
import SignInView from './views/SignInView';

function SignIn() {
  const client = useApolloClient();
  const {enqueueSnackbar} = useSnackbar();

  const [signInMutation] = useCreateTokenMutation({
    onCompleted: data => {
      const {access_token, refresh_token} = data.createToken;
      storeToken(client, {access_token, refresh_token});
      enqueueSnackbar('로그인 했습니다.', {variant: 'success'});
      Router.push('/dashboard');
    },
    onError: e => {
      console.error(e);
      enqueueSnackbar(e.message, {variant: 'error'});
    },
  });

  const onSubmit = async values => {
    return signInMutation({
      variables: {
        data: values,
      },
    });
  };

  return <SignInView onSubmit={onSubmit} />;
}

export default SignIn;
