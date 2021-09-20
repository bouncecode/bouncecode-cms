/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.SignIn.views
 */

import {useEffect} from 'react';
import {useFormik, FormikConfig, FormikValues, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {useSnackbar} from 'notistack';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('이메일 형식이 아닙니다.')
    .required('필수 항목입니다.'),
  password: Yup.string()
    .min(6, '비밀번호는 6자 이상이어야 합니다.')
    .required('필수 항목입니다.'),
});

export function useSigninViewFormik(
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => void | Promise<any>,
  options?: Partial<FormikConfig<FormikValues>>,
) {
  const {enqueueSnackbar} = useSnackbar();

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
      enqueueSnackbar('누락된 입력 항목을 확인해주세요.', {
        variant: 'error',
      });
    }
  }, [formik.submitCount, formik.isSubmitting]);

  return formik;
}
