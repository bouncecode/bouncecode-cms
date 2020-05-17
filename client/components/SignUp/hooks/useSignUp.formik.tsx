/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.SignUp.hooks
 */

import { useEffect } from "react";
import { useFormik, FormikConfig, FormikValues } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useSignUpMutation } from "./useSignUp.mutation";

const initialValues = {
  email: "",
  password: "",
  passwordConfirm: "",
  payload: {
    displayName: "",
  },
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("이메일 형식이 아닙니다.")
    .required("필수 항목입니다."),
  password: Yup.string()
    .min(6, "비밀번호는 6자 이상이어야 합니다.")
    .required("필수 항목입니다."),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("필수 항목입니다."),
  payload: Yup.object().shape({
    displayName: Yup.string().required("필수 항목입니다."),
  }),
});

export function useSignUpFormik(options?: Partial<FormikConfig<FormikValues>>) {
  const { enqueueSnackbar } = useSnackbar();
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

  const formik = useFormik({
    ...options,
    initialValues: {
      ...initialValues,
      ...options?.initialValues,
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (formik.submitCount > 0 && !formik.isSubmitting && !formik.isValid) {
      enqueueSnackbar("누락된 입력 항목을 확인해주세요.", { variant: "error" });
    }
  }, [formik.submitCount, formik.isSubmitting]);

  return formik;
}
