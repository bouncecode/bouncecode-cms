import { QueryResult, Query } from "material-table";

export interface ITableDataCallback {
  (query: Query<any>): Promise<QueryResult<any>>;
}
