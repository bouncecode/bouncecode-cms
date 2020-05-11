import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSignUpStyles } from "./hooks/useSignUp.styles";
import { useSignUpFormik } from "./hooks/useSignUp.formik";
import { Link } from "client/components/Link";

export function SignUp() {
  const classes = useSignUpStyles();
  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    isSubmitting,
  } = useSignUpFormik();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon color="primary" />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
                    : ""
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
                helperText={touched.email ? errors.email : ""}
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
                helperText={touched.password ? errors.password : ""}
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
                  touched.passwordConfirm ? errors.passwordConfirm : ""
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            className={classes.submit}
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
          >
            회원가입
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin/">이미 계정이 있으신가요?</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
