/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.commons
 */

import { useQuery, QueryHookOptions } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ME_QUERY = gql`
  query {
    me {
      id
      email
      isAdmin
      payload
      createdDate
      updatedDate
    }
  }
`;

export interface IMeQueryObject {
  me?: {
    id: number;
    email: string;
    isAdmin: boolean;
    payload?: any;
  };
}

/**
 * 로그인된 경우 자신의 정보를 가져옵니다.
 *
 * @author BounceCode, Inc.
 */
export const useMeQuery = (options?: QueryHookOptions<any, any>) => {
  return useQuery<IMeQueryObject>(ME_QUERY, options);
};
