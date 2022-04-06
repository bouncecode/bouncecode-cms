/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import AdminLayout from 'client/layouts/DashboardLayout';

function MenusPage() {
  return (
    <>
      <h1>메뉴 관리</h1>
    </>
  );
}

MenusPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default MenusPage;
