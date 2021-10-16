/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {makeStyles} from '@material-ui/core/styles';

export const useSignInViewStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));
