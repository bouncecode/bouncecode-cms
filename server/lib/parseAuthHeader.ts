import jwt from "jsonwebtoken";
import { CERT_PUBLIC } from "../../envconfig";

const parseAuthHeader = async (authHeader = "") => {
  try {
    const token = authHeader.replace(/Bearer /i, "");
    const jwtObj = await jwt.verify(token, CERT_PUBLIC);
    if (jwtObj.sub === "access_token") return jwtObj;
  } catch (e) {}
  return null;
};

export default parseAuthHeader;
