/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';

// @mui/material components
import {AppBar, LinearProgress} from '@mui/material';
import {usePageLoadingViewStyles} from '../styles/PageLoadingView.styles';

/**
 * 페이지 로딩 애니메이션입니다.
 */
export function PageLoadingView() {
  const classes = usePageLoadingViewStyles();

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      className={classes.appbar}>
      <LinearProgress color="secondary" />
    </AppBar>
  );
}
