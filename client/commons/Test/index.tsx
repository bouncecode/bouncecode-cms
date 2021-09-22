/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Test
 */

import {useTestQuery} from 'client/generated/graphql';
import React from 'react';
import {TestView} from './views/TestView';

export const Test = () => {
  const {loading, error, data} = useTestQuery({
    variables: {
      message: 'test',
    },
  });

  return <TestView data={data} />;
};
