/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {
  useApolloClient,
  QueryOptions,
  OperationVariables,
} from '@apollo/client';
import {useCallback} from 'react';
import {UsersDocument, UsersQuery} from 'client/generated/graphql';
import {QueryResult, Query} from '@material-table/core';

export interface ITableDataCallback {
  (query: Query<any>): Promise<QueryResult<any>>;
}

const useUserTableDataCallback = (
  options: Partial<QueryOptions<OperationVariables>> = {},
) => {
  const client = useApolloClient();
  // const { enqueueSnackbar } = useSnackbar();

  return useCallback<ITableDataCallback>(async query => {
    const {data} = await client.query<UsersQuery>({
      ...options,
      query: UsersDocument,
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

    console.log(data?.users);

    return {
      data: data?.users.map(user => ({...user})) || [],
      page: query.page,
      totalCount: 100, // TODO: totalCount
    };
  }, []);
};

export default useUserTableDataCallback;
