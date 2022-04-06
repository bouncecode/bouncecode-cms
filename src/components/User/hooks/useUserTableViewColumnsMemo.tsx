/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {useMemo} from 'react';
import {Column} from '@material-table/core';

function useUserTableViewColumnsMemo() {
  return useMemo<Array<Column<any>>>(() => {
    return [
      {
        title: 'ID',
        headerStyle: {
          minWidth: 100,
        },
        render: value => {
          return value.id;
        },
      },
      {
        title: '이름',
        headerStyle: {
          minWidth: 150,
        },
        render: value => {
          return value.payload?.displayName;
        },
      },
      {
        title: '이메일',
        headerStyle: {
          minWidth: 200,
        },
        render: value => {
          return value.email;
        },
      },
    ];
  }, []);
}

export default useUserTableViewColumnsMemo;
