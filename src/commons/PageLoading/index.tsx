/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';

import {usePageLoadingState} from './hooks/usePageLoading.state';
import {PageLoadingView} from './views/PageLoadingView';

export function PageLoading(props) {
  const [loading] = usePageLoadingState();

  if (loading) {
    return <PageLoadingView />;
  } else {
    return null;
  }
}
