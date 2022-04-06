/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

/**
 * Material UI 테마를 설정합니다.
 *
 * @author BounceCode, Inc.
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
