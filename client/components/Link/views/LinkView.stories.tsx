/**
 * @author BounceCode, Inc.
 */

import * as React from "react";
import { LinkView } from "./LinkView";
import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: "Link/LinkView",
  component: LinkView,
  decorators: [withKnobs],
};

export const defaultView = () => {
  const children = text("children", "Hello, world!");

  return <LinkView href="/">{children}</LinkView>;
};
