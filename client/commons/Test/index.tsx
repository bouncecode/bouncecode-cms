/**
 * @author BounceCode, Inc.
 * @packageDocumentation
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
