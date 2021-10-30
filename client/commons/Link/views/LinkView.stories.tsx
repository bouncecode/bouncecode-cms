/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import * as React from 'react';
import {LinkView} from './LinkView';
import {withKnobs, text} from '@storybook/addon-knobs';

export default {
  title: 'Commons',
  component: LinkView,
  decorators: [withKnobs],
};

export const Link = () => {
  const children = text('children', 'Hello, world!');

  return <LinkView href="/">{children}</LinkView>;
};
