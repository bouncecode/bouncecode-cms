/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React, {useEffect} from 'react';
import Router from 'next/router';

function IndexPage() {
  useEffect(() => {
    Router.push('/signin');
  });

  return <div />;
}

export default IndexPage;
