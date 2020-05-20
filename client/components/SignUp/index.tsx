/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.SignUp
 */

import React from "react";
import { SignUpView } from "./views/SignUpView";
import { useSignUpMutation } from "./hooks/useSignUp.mutation";

export function SignUp() {
  const [signUpMutation] = useSignUpMutation();

  const onSubmit = async (values) => {
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
