/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import AdminLayout from 'client/layouts/DashboardLayout';

function PopupsPage() {
  return (
    <>
      <h1>팝업 목록</h1>
    </>
  );
}

PopupsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default PopupsPage;
