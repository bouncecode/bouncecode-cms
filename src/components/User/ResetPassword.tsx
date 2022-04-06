/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import useResetPasswordSubmitCallback from './hooks/useResetPasswordSubmitCallback';
import ResetPasswordView from './views/ResetPasswordView';

function ResetPassword() {
  const resetPasswordCallback = useResetPasswordSubmitCallback();

  return <ResetPasswordView onSubmit={resetPasswordCallback} />;
}

export default ResetPassword;
