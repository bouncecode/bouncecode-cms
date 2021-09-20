/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.UserTable.hooks
 */

import {useApolloClient} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {QueryOptions, OperationVariables} from 'apollo-client';
import {useCallback} from 'react';
import {ITableDataCallback} from 'client/commons/interfaces';

const USERS_QUERY = gql`
  query($take: Float!, $skip: Float!, $where: UserWhereInput) {
    users(take: $take, skip: $skip, where: $where) {
      id
      email
      isAdmin
      payload
      createdDate
      updatedDate
    }

    # usersCount(where: $where)
  }
`;

export const useUserTableDataCallback = (
  options: Partial<QueryOptions<OperationVariables>> = {},
) => {
  const client = useApolloClient();
  // const { enqueueSnackbar } = useSnackbar();

  return useCallback<ITableDataCallback>(async query => {
    const {data} = await client.query({
      ...options,
      query: USERS_QUERY,
      variables: {
        ...options.variables,
        take: query.pageSize,
        skip: query.page * query.pageSize,
      },
      // onError: (e) => {
      //   console.error(e);
      //   enqueueSnackbar(e.message, { variant: "error" });
      // },
    });

    return {
      data: data?.users || [],
      page: query.page,
      totalCount: 100, // TODO: totalCount
    };
  }, []);
};
