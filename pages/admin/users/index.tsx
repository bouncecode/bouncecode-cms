import React from "react";
import { AdminLayout } from "client/components/AdminLayout";
import { UserTable } from "client/components/UserTable";

const UsersPage = () => {
  return (
    <>
      <h1>사용자 관리</h1>
      <UserTable />
    </>
  );
};

UsersPage.Layout = AdminLayout;

export default UsersPage;
