/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import AdminLayout from 'client/layouts/DashboardLayout';

function FaqsWritePage() {
  return (
    <>
      <h1>FAQ 추가</h1>
    </>
  );
}

FaqsWritePage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default FaqsWritePage;
