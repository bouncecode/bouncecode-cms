/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Test
 */

import React from "react";
import { useTestQuery } from "./hooks/useTest.query";
import { TestView } from "./views/TestView";

export const Test = () => {
  const { loading, error, data } = useTestQuery();

  return <TestView data={data} />;
};
