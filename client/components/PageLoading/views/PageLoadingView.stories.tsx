/**
 * @author BounceCode, Inc.
 */

import * as React from "react";
import { PageLoadingView } from "./PageLoadingView";

export default {
  title: "PageLoading/PageLoadingView",
  component: PageLoadingView,
};

export const defaultView = () => {
  return <PageLoadingView />;
};
