/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import {Link} from '@mui/material';
import useSignUpFormik from '../hooks/useSignUpFormik';
import {FormikHelpers, FormikValues} from 'formik';
import {
  UserForm,
  UserFormPaper,
  UserFormSubmit,
} from '../styles/UserFormStyles';

export interface ISignUpView {
  /**
   * 비밀번호 찾기 버튼을 클릭했을 때 호출하는 함수입니다.
   */
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => void | Promise<any>;
}

function SignUpView(props: ISignUpView) {
  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    isSubmitting,
  } = useSignUpFormik(props.onSubmit);

  return (
    <Container maxWidth="xs">
      <UserFormPaper>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon color="primary" />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <UserForm onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="이름"
                id="payload.displayName"
                name="payload.displayName"
                autoFocus
                onChange={handleChange}
                value={values.payload?.displayName}
                helperText={
                  (touched.payload as any)?.displayName
                    ? (errors.payload as any)?.displayName
                    : ''
                }
                error={
                  (touched.payload as any)?.displayName &&
                  Boolean((errors.payload as any)?.displayName)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                helperText={touched.email ? errors.email : ''}
                error={touched.email && Boolean(errors.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="password"
                onChange={handleChange}
                value={values.password}
                helperText={touched.password ? errors.password : ''}
                error={touched.password && Boolean(errors.password)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="비밀번호 확인"
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                onChange={handleChange}
                value={values.passwordConfirm}
                helperText={
                  touched.passwordConfirm ? errors.passwordConfirm : ''
                }
                error={
                  touched.passwordConfirm && Boolean(errors.passwordConfirm)
                }
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="옐로캠페인과 관련된 메일을 수신합니다."
              />
            </Grid> */}
          </Grid>
          <UserFormSubmit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}>
            회원가입
          </UserFormSubmit>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin/">이미 계정이 있으신가요?</Link>
            </Grid>
          </Grid>
        </UserForm>
      </UserFormPaper>
    </Container>
  );
}

export default SignUpView;
