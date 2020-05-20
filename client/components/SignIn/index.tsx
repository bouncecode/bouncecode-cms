/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.SignIn
 */

import React from "react";
import { useSignInMutation } from "./hooks/useSignIn.mutation";
import { SignInView } from "./views/SignInView";

export function SignIn() {
  const [signInMutation] = useSignInMutation();

  const onSubmit = async (values) => {
    return signInMutation({
      variables: {
        data: values,
      },
    });
  };

  return <SignInView onSubmit={onSubmit} />;
}
