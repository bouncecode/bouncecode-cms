/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {useUserTableDataCallback} from './hooks/useUserTableData.callback';
import {UserTableView} from './views/UserTableView';

function UserTable() {
  const data = useUserTableDataCallback();

  return <UserTableView data={data} />;
}

export default UserTable;
