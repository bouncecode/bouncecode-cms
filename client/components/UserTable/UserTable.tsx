import React from "react";
import MaterialTable from "material-table";
import { useUserTableColumnsMemo } from "./hooks/useUserTableColumns.memo";
import { useUserTableDataCallback } from "./hooks/useUserTableData.callback";

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

export function UserTable() {
  const columns = useUserTableColumnsMemo();
  const data = useUserTableDataCallback();

  return (
    <MaterialTable
      title="목록"
      columns={columns}
      data={data}
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
