/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import AdminLayout from 'client/layouts/DashboardLayout';

function PagesWritePage() {
  return (
    <>
      <h1>페이지 추가</h1>
    </>
  );
}

PagesWritePage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default PagesWritePage;
