import React from "react";
import { useTestQuery } from "./hooks/useTest.query";

export const Test = () => {
  const { loading, error, data } = useTestQuery();
  return <div>{JSON.stringify(data)}</div>;
};
