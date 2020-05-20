/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.UserTable
 */

import { useUserTableDataCallback } from "./hooks/useUserTableData.callback";
import { UserTableView } from "./views/UserTableView";

export function UserTable() {
  const data = useUserTableDataCallback();

  return <UserTableView data={data} />;
}
