/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.AdminLayout
 */

import React from "react";
import Router from "next/router";

import { AdminLayoutDrawerView } from "./views/AdminLayoutDrawerView";
import { useSignOutCallback } from "client/commons/useSignOut.callback";
import { useMeQuery } from "client/commons/useMe.query";
import { useSnackbar } from "notistack";
import { PageLoadingView } from "../PageLoading/views/PageLoadingView";
import { AdminLayoutView } from "./views/AdminLayoutView";

export function AdminLayout({ children }) {
  const handleLogout = useSignOutCallback();
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useMeQuery({
    onCompleted: (data) => {
      if (!data?.me?.isAdmin) {
        enqueueSnackbar("권한이 없습니다.", { variant: "error" });
        Router.push("/");
      }
    },
    onError: () => {
      Router.push("/signin");
    },
  });

  if (loading || !data || !data?.me?.isAdmin) {
    return <PageLoadingView />;
  }

  return (
    <AdminLayoutView
      drawer={<AdminLayoutDrawerView />}
      data={data}
      handleLogout={handleLogout}
      children={children}
    />
  );
}
