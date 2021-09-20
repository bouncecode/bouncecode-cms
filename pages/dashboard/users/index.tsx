/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module pages.admin.users
 */

import React from "react";
import { AdminLayout } from "client/components/AdminLayout";
import { UserTable } from "client/components/UserTable";

function UsersPage() {
  return (
    <>
      <h1>사용자 관리</h1>
      <UserTable />
    </>
  );
}

UsersPage.Layout = AdminLayout;

export default UsersPage;
