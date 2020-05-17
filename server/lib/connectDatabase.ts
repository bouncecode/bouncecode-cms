/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.lib
 */

import { createConnection, getConnectionManager, BaseEntity } from "typeorm";
import seeds from "../../seeds";

/**
 * 데이터베이스와 연결하기위해 사용하는 함수입니다.
 * {@link expressApp} 에서 요청을 실행하기 전에 사용됩니다.
 *
 * @author BounceCode, Inc.
 */
export const connectDatabase = async () => {
  try {
    if (getConnectionManager().get().isConnected) {
      return;
    }
  } catch (e) {}

  await createConnection();
  await seeds();
};
