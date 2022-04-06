/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import App, {AppContext} from 'next/app';
import Head from 'next/head';
import cookie from 'cookie';
import {SnackbarProvider} from 'notistack';
import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import theme from 'client/lib/theme';
import {PageLoading} from 'client/commons/PageLoading';
import {ApolloProvider} from '@apollo/client';
import {useApollo} from 'client/lib/apolloClient';

function MyApp(props) {
  const {Component, pageProps, req} = props;
  const getLayout = Component.getLayout ?? (page => page);
  const apolloClient = useApollo(pageProps, req);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>BounceCode CMS</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <PageLoading />
          <SnackbarProvider>
            {getLayout(<Component {...pageProps} />)}
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie,
  );

  return {
    ...appProps,
    cookies,
  };
};

export default MyApp;
