/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import AdminLayout from 'client/layouts/DashboardLayout';

function FaqsPage() {
  return (
    <>
      <h1>FAQ 목록</h1>
    </>
  );
}

FaqsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default FaqsPage;
