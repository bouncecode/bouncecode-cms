/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import AdminLayout from 'client/layouts/DashboardLayout';

function PagesPage() {
  return (
    <>
      <h1>페이지 목록</h1>
    </>
  );
}

PagesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default PagesPage;
