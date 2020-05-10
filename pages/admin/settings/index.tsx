import React from "react";
import { AdminLayout } from "client/components/AdminLayout";
import { Test } from "client/components/Test";

const Settings = () => {
  return (
    <>
      <h1>사이트 설정</h1>
      <Test />
    </>
  );
};

Settings.Layout = AdminLayout;

export default Settings;
