import gql from "graphql-tag";

export const TEST_QUERY = gql`
  query TEST($message: String!) {
    test(message: $message) {
      message
    }
  }
`;
