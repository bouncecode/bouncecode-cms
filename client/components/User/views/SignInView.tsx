/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSigninViewFormik} from '../hooks/useSignInView.formik';
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
 * 로그인 화면입니다.
 */
export function SignInView(props: IResetPasswordView) {
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    isSubmitting,
  } = useSigninViewFormik(props.onSubmit);

  // const googleSignIn = useSigninGoogleCallback();
  // const facebookSignIn = useSigninFacebookCallback();

  return (
    <Container maxWidth="xs">
      <UserFormPaper>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon color="primary" />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        {/* <div className={classes.loginButton}>
            <GoogleLoginButton onClick={googleSignIn} />
            <FacebookLoginButton onClick={facebookSignIn} />
          </div> */}
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
                // autoFocus
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
              {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="로그인 유지하기"
                /> */}
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
            로그인
          </UserFormSubmit>
          <Grid container justify="flex-end">
            {/* <Grid container> */}
            {/* <Grid item xs>
              <Link href="/reset-password/">비밀번호를 잊으셨나요?</Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup/">아직 계정이 없으신가요?</Link>
            </Grid>
          </Grid>
        </UserForm>
      </UserFormPaper>
    </Container>
  );
}
