import React from "react";
import Layout from "src/components/admin/Layout";
import { useQuery } from "@apollo/react-hooks";
import { TEST_QUERY } from "src/gql/test";

const Settings = () => {
  const { loading, error, data } = useQuery(TEST_QUERY, {
    variables: { message: "test" },
  });

  return (
    <>
      <h1>사이트 설정</h1>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};

Settings.Layout = Layout;

export default Settings;
