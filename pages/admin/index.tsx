/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module pages.admin
 */

import React, { useEffect } from "react";
import Router from "next/router";

function AdminPage() {
  useEffect(() => {
    Router.push("/admin/settings");
  });

  return <div />;
}

export default AdminPage;
