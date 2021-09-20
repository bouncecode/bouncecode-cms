/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.ResetPassword.views
 */

import * as React from 'react';
import {ResetPasswordView} from './ResetPasswordView';
import {action} from '@storybook/addon-actions';
import {SnackbarProvider} from 'notistack';

export default {
  title: 'ResetPassword/ResetPasswordView',
  component: ResetPasswordView,
};

export const defaultView = () => {
  return (
    <SnackbarProvider>
      <ResetPasswordView onSubmit={action('onSubmit')} />
    </SnackbarProvider>
  );
};
