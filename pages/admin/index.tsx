import React, { useEffect } from "react";
import Router from "next/router";

export default function AdminPage() {
  useEffect(() => {
    Router.push("/admin/settings");
  });

  return <div />;
}
