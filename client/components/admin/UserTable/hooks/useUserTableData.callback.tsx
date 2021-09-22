/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.UserTable.hooks
 */

import {
  useApolloClient,
  QueryOptions,
  OperationVariables,
} from '@apollo/client';
import {useCallback} from 'react';
import {ITableDataCallback} from '../interfaces';
import {UsersDocument} from 'client/generated/graphql';

export const useUserTableDataCallback = (
  options: Partial<QueryOptions<OperationVariables>> = {},
) => {
  const client = useApolloClient();
  // const { enqueueSnackbar } = useSnackbar();

  return useCallback<ITableDataCallback>(async query => {
    const {data} = await client.query({
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

    return {
      data: data?.users || [],
      page: query.page,
      totalCount: 100, // TODO: totalCount
    };
  }, []);
};
