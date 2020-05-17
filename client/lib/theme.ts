/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.lib
 */

import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

/**
 * Material UI 테마를 설정합니다.
 *
 * @author BounceCode, Inc.
 */
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
