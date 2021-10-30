/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import {useResetPasswordCallback} from './hooks/useResetPassword.callback';
import {ResetPasswordView} from './views/ResetPasswordView';

export function ResetPassword() {
  const resetPasswordCallback = useResetPasswordCallback();

  return <ResetPasswordView onSubmit={resetPasswordCallback} />;
}
