import React from "react";

// @material-ui/core components
import { AppBar, LinearProgress } from "@material-ui/core";
import { usePageLoadingStyles } from "./hooks/usePageLoading.styles";
import { usePageLoadingState } from "./hooks/usePageLoading.state";

export function PageLoading(props) {
  const classes = usePageLoadingStyles();
  const [loading, setLoading] = usePageLoadingState();

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
