/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import AdminLayout from 'client/layouts/DashboardLayout';

function BoardsWritePage() {
  return (
    <>
      <h1>게시판 추가</h1>
    </>
  );
}

BoardsWritePage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default BoardsWritePage;
