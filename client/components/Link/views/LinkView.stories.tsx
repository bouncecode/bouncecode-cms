/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Link.views
 */

import * as React from "react";
import { LinkView } from "./LinkView";

export default {
  title: "Link/LinkView",
  component: LinkView,
};

export const defaultView = () => {
  return <LinkView href="/">텍스트</LinkView>;
};
