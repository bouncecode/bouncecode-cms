/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.PageLoading.views
 */

import React from 'react';

// @material-ui/core components
import {AppBar, LinearProgress} from '@material-ui/core';
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
