/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module pages.admin.settings
 */

import React from "react";
import { AdminLayout } from "client/components/AdminLayout";
import { Test } from "client/components/Test";

function SettingsPage() {
  return (
    <>
      <h1>사이트 설정</h1>
      <Test />
    </>
  );
}

SettingsPage.Layout = AdminLayout;

export default SettingsPage;
