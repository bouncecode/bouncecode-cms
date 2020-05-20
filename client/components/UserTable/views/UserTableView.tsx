/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.UserTable
 */

import React from "react";
import MaterialTable from "material-table";
import { useUserTableViewColumns } from "./UserTableView.columns";
import { ITableDataCallback } from "client/commons/interfaces";

const localization = {
  header: {
    actions: "",
  },
  body: {
    emptyDataSourceMessage: "데이터가 없습니다.",
    filterRow: {
      filterTooltip: "필터",
    },
  },
};

export interface IUserTableView {
  data: ITableDataCallback;
}

export function UserTableView(props: IUserTableView) {
  const columns = useUserTableViewColumns();

  return (
    <MaterialTable
      title="목록"
      columns={columns}
      data={props.data}
      localization={localization}
      options={{
        search: false,
        showFirstLastPageButtons: false,
        actionsColumnIndex: -1,
        pageSize: 10,
      }}
    />
  );
}
