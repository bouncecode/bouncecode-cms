/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module pages
 */

import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import {SnackbarProvider} from 'notistack';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'client/lib/theme';
import {PageLoading} from 'client/commons/PageLoading';
import {ApolloProvider} from '@apollo/client';
import {useApollo} from 'client/lib/apolloClient';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function MyApp(props) {
  const {Component, pageProps, req} = props;
  const Layout = Component.Layout || (({children}) => <>{children}</>);
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
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <PageLoading />
        <SnackbarProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ApolloProvider client={apolloClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ApolloProvider>
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    ctx: {
      req: {
        headers: appContext.ctx.req?.headers,
      },
    },
  };
};

export default MyApp;
