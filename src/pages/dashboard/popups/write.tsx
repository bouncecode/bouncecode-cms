/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import AdminLayout from 'client/layouts/DashboardLayout';

function PopupsWritePage() {
  return (
    <>
      <h1>팝업 추가</h1>
    </>
  );
}

PopupsWritePage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default PopupsWritePage;
