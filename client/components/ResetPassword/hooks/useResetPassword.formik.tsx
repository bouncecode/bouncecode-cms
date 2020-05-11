import { useEffect } from "react";
import { useFormik, FormikValues, FormikConfig } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useResetPasswordCallback } from "./useResetPassword.callback";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("이메일 형식이 아닙니다.")
    .required("필수 항목입니다."),
});

export function useResetPasswordFormik(
  options?: Partial<FormikConfig<FormikValues>>
) {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = useResetPasswordCallback();

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
