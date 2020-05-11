import { useQuery, QueryHookOptions } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ME_QUERY = gql`
  query {
    me {
      id
      email
      isAdmin
      payload
      createdAt
      updatedAt
    }
  }
`;

export const useMeQuery = (options?: QueryHookOptions<any, any>) => {
  return useQuery(ME_QUERY, options);
};
