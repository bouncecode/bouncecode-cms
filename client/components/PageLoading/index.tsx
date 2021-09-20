/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.PageLoading
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
