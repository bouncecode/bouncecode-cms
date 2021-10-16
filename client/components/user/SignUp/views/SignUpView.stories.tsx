/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import * as React from 'react';
import {action} from '@storybook/addon-actions';
import {SnackbarProvider} from 'notistack';
import {SignUpView} from './SignUpView';

export default {
  title: 'Components/User',
  component: SignUpView,
};

export const SignUp = () => {
  return (
    <SnackbarProvider>
      <SignUpView onSubmit={action('onSubmit')} />
    </SnackbarProvider>
  );
};
