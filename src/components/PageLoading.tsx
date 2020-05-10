import React, { useEffect, useState } from "react";
import Router from "next/router";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: 9999,
  },
}));

export default function PageLoading(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const routeChangeStart = (url) => {
      console.log(`Loading: ${url}`);
      setLoading(true);
    };

    const routeChangeEnd = (url) => {
      // firebase.analytics().setCurrentScreen(url);
      setLoading(false);
    };

    Router.events.on("routeChangeStart", routeChangeStart);
    Router.events.on("routeChangeComplete", routeChangeEnd);
    Router.events.on("routeChangeError", routeChangeEnd);

    return () => {
      Router.events.off("routeChangeStart", routeChangeStart);
      Router.events.off("routeChangeComplete", routeChangeEnd);
      Router.events.off("routeChangeError", routeChangeEnd);
    };
  }, []);

  if (loading) {
    return (
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        className={classes.appbar}
      >
        <LinearProgress color="secondary" />
      </AppBar>
    );
  } else {
    return null;
  }
}
