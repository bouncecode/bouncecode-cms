/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Button.views
 */

import * as React from 'react';
import {ButtonView} from './ButtonView';
import {withKnobs, text} from '@storybook/addon-knobs';

export default {
  title: 'Button/ButtonView',
  component: ButtonView,
  decorators: [withKnobs],
};

export const defaultView = () => {
  const children = text('children', 'Hello, world!');

  return <ButtonView href="/">{children}</ButtonView>;
};
