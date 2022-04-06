/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import * as React from 'react';
import ResetPasswordView from './ResetPasswordView';
import {action} from '@storybook/addon-actions';
import {SnackbarProvider} from 'notistack';

export default {
  title: 'Components/User',
  component: ResetPasswordView,
};

export const ResetPassword = () => {
  return (
    <SnackbarProvider>
      <ResetPasswordView onSubmit={action('onSubmit')} />
    </SnackbarProvider>
  );
};
