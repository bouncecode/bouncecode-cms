/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import {SignUpView} from './views/SignUpView';
import {useCreateUserMutation} from 'client/generated/graphql';
import {useSnackbar} from 'notistack';
import Router from 'next/router';

function SignUp() {
  const {enqueueSnackbar} = useSnackbar();

  const [signUpMutation] = useCreateUserMutation({
    onCompleted: () => {
      enqueueSnackbar('회원가입 했습니다.', {variant: 'success'});
      Router.push('/signin');
    },
    onError: e => {
      console.error(e);
      enqueueSnackbar(e.message, {variant: 'error'});
    },
  });

  const onSubmit = async values => {
    return signUpMutation({
      variables: {
        data: {
          ...values,
          passwordConfirm: undefined,
        },
      },
    });
  };

  return <SignUpView onSubmit={onSubmit} />;
}

export {SignUp};
