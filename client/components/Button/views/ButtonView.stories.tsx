/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Button.views
 */

import * as React from "react";
import { ButtonView } from "./ButtonView";

export default {
  title: "Button/ButtonView",
  component: ButtonView,
};

export const defaultView = () => {
  return <ButtonView href="/">텍스트</ButtonView>;
};
