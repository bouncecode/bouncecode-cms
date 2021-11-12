/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {useEffect} from 'react';
import {useFormik, FormikConfig, FormikValues, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {
  CommentsDocument,
  CommentStatDocument,
  useCommentCreateMutation,
} from 'client/generated/graphql';

const initialValues = {
  text: '',
};

const validationSchema = Yup.object().shape({
  text: Yup.string().required('필수 항목입니다.'),
});

export function useCommentCreateFormik(
  postId: string,
  options?: Partial<FormikConfig<FormikValues>>,
) {
  const {enqueueSnackbar} = useSnackbar();
  const [create] = useCommentCreateMutation({
    onCompleted: () => {
      formik.handleReset(null);
    },
  });

  const onSubmit = async (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => {
    return create({
      variables: {
        data: {
          postId,
          text: values.text,
          payload: {},
        },
      },
      refetchQueries: [CommentsDocument, CommentStatDocument],
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
      enqueueSnackbar('누락된 입력 항목을 확인해주세요.', {
        variant: 'error',
      });
    }
  }, [formik.submitCount, formik.isSubmitting]);

  return formik;
}
