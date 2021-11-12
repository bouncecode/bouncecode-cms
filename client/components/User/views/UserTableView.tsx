/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React from 'react';
import MaterialTable from 'material-table';
import useUserTableViewColumnsMemo from '../hooks/useUserTableViewColumnsMemo';
import {ITableDataCallback} from '../hooks/useUserTableDataCallback';

const localization = {
  header: {
    actions: '',
  },
  body: {
    emptyDataSourceMessage: '데이터가 없습니다.',
    filterRow: {
      filterTooltip: '필터',
    },
  },
};

export interface IUserTableView {
  data: ITableDataCallback;
}

function UserTableView(props: IUserTableView) {
  const columns = useUserTableViewColumnsMemo();

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

export default UserTableView;
