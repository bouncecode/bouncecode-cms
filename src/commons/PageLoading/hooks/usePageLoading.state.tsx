/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {useEffect, useState} from 'react';
import Router from 'next/router';

export function usePageLoadingState() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const routeChangeStart = url => {
      console.log(`Loading: ${url}`);
      setLoading(true);
    };

    const routeChangeEnd = url => {
      // firebase.analytics().setCurrentScreen(url);
      setLoading(false);
    };

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  }, []);

  return [loading, setLoading];
}
