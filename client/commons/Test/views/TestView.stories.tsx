/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Test.views
 */

import * as React from 'react';
import {TestView} from './TestView';
import {withKnobs, object} from '@storybook/addon-knobs';

export default {
  title: 'Commons',
  component: TestView,
  decoration: [withKnobs],
};

export const Test = () => {
  const data = object('data', {test: 'message'});

  return <TestView data={data} />;
};
