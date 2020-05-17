/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.commons
 */

import { QueryResult, Query } from "material-table";

/**
 * 테이블 데이터를 가져오기 위한 함수에 대한 인터페이스입니다.
 *
 * @author BounceCode, Inc.
 */
export interface ITableDataCallback {
  (query: Query<any>): Promise<QueryResult<any>>;
}
