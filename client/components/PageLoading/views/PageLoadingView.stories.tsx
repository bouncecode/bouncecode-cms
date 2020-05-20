/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.PageLoading.views
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
