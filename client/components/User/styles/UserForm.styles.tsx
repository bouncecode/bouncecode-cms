/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {Button} from '@material-ui/core';
import {styled} from '@material-ui/core/styles';

export const UserFormPaper = styled('div')(({theme}) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const UserForm = styled('form')(({theme}) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(3),
}));

export const UserFormAvatar = styled('div')(({theme}) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

export const UserFormSubmit = styled(Button)(({theme}) => ({
  margin: theme.spacing(3, 0, 2),
}));
