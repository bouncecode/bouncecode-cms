/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.SignIn.hooks
 */

import gql from 'graphql-tag';
import {useMutation, useApolloClient} from '@apollo/react-hooks';
import {useSnackbar} from 'notistack';
import Router from 'next/router';
import {storeToken} from 'client/lib/token';

const CREATE_TOKEN = gql`
  mutation($data: TokenCreateInput!) {
    createToken(data: $data) {
      access_token
      refresh_token
    }
  }
`;

export function useSignInMutation() {
  const client = useApolloClient();
  const {enqueueSnackbar} = useSnackbar();

  return useMutation(CREATE_TOKEN, {
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
}
