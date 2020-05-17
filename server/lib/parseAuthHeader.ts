/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.lib
 */

import jwt from "jsonwebtoken";
import { CERT_PUBLIC } from "../../env.config";

/**
 * 사용자정보를 인증하기 위한 파일입니다.
 * {@link expressApp} 에서 요청을 실행하기 전에 사용됩니다.
 *
 * @author BounceCode, Inc.
 */
export const parseAuthHeader = async (authHeader = "") => {
  try {
    const token = authHeader.replace(/Bearer /i, "");
    const jwtObj = await jwt.verify(token, CERT_PUBLIC);
    if (jwtObj.sub === "access_token") return jwtObj;
  } catch (e) {}
  return null;
};
