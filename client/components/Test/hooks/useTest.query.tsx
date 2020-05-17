/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.Test.hooks
 */

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const TEST_QUERY = gql`
  query($message: String!) {
    test(message: $message) {
      message
    }
  }
`;

export const useTestQuery = () => {
  return useQuery(TEST_QUERY, {
    variables: { message: "test" },
  });
};
