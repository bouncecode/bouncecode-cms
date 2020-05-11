import React from "react";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "client/lib/theme";
import { withApollo } from "client/lib/apollo";
import { PageLoading } from "client/components/PageLoading";

function MyApp(props) {
  const { Component, pageProps } = props;
  const Layout = Component.Layout || (({ children }) => <>{children}</>);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default withApollo({ ssr: true })(MyApp);
