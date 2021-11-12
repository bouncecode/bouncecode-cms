/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useResetPasswordViewFormik} from '../hooks/useResetPasswordView.formik';
import {Link} from 'client/commons/Link';
import {FormikValues, FormikHelpers} from 'formik';
import {
  UserForm,
  UserFormPaper,
  UserFormSubmit,
} from '../styles/UserForm.styles';

export interface IResetPasswordView {
  /**
   * 비밀번호 찾기 버튼을 클릭했을 때 호출하는 함수입니다.
   */
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => void | Promise<any>;
}

/**
 * 비밀번호 찾기 화면입니다.
 */
export function ResetPasswordView(props: IResetPasswordView) {
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting,
  } = useResetPasswordViewFormik(props.onSubmit);

  return (
    <Container maxWidth="xs">
      <UserFormPaper>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon color="primary" />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          비밀번호 찾기
        </Typography>
        <UserForm onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                value={values.email}
                helperText={touched.email ? errors.email : ''}
                error={touched.email && Boolean(errors.email)}
              />
            </Grid>
          </Grid>
          <UserFormSubmit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}>
            비밀번호 찾기
          </UserFormSubmit>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin/" variant="body2">
                이미 계정이 있으신가요?
              </Link>
            </Grid>
          </Grid>
        </UserForm>
      </UserFormPaper>
    </Container>
  );
}
