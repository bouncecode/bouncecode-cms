/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import AdminLayout from 'client/layouts/DashboardLayout';

function BoardsPage() {
  return (
    <>
      <h1>게시판 목록</h1>
    </>
  );
}

BoardsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default BoardsPage;
