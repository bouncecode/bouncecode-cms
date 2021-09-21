/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.SignIn.views
 */

import * as React from 'react';
import {action} from '@storybook/addon-actions';
import {SnackbarProvider} from 'notistack';
import {SignInView} from './SignInView';

export default {
  title: 'Components/User',
  component: SignInView,
};

export const SignIn = () => {
  return (
    <SnackbarProvider>
      <SignInView onSubmit={action('onSubmit')} />
    </SnackbarProvider>
  );
};
