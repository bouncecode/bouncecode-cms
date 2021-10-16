/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

// Material Core
import {makeStyles} from '@material-ui/core/styles';

export const useAdminLayoutViewStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    '& a, & a:hover, & a:active, & a:focus': {
      color: 'inherit',
      textTransform: 'none',
    },
  },
}));
