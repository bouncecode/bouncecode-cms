/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.ResetPassword.hooks
 */

import { useCallback } from "react";
// import firebase from "firebase";
import { useSnackbar } from "notistack";
import { FormikValues, FormikHelpers } from "formik";

export function useResetPasswordCallback() {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    async (
      values: FormikValues,
      formikHelpers: FormikHelpers<FormikValues>
    ) => {
      try {
        // await firebase.auth().sendPasswordResetEmail(values.email);
        enqueueSnackbar("이메일을 확인해주세요.", { variant: "success" });
      } catch (e) {
        console.error(e);
        enqueueSnackbar(e.message, { variant: "error" });
      }
    },
    []
  );
}
