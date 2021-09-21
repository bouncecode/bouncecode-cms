/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.SignIn.views
 */

import React from 'react';
// import {
//   GoogleLoginButton,
//   FacebookLoginButton
// } from "react-social-login-buttons";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSignInViewStyles} from '../styles/SignInView.styles';
import {useSigninViewFormik} from '../hooks/useSignInView.formik';
// import useSigninFacebookCallback from "src/hooks/callbacks/useSigninFacebookCallback";
// import useSigninGoogleCallback from "src/hooks/callbacks/useSigninGoogleCallback";
import {Link} from '../../../../commons/Link';
import {FormikValues, FormikHelpers} from 'formik';

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
  const classes = useSignInViewStyles();
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
      <div className={classes.paper}>
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
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}>
            로그인
          </Button>
          <Grid container justify="flex-end">
            {/* <Grid container> */}
            {/* <Grid item xs>
              <Link href="/reset-password/">비밀번호를 잊으셨나요?</Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup/">아직 계정이 없으신가요?</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
