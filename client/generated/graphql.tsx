import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type ConfigLogObject = {
  __typename?: 'ConfigLogObject';
  createdBy: Scalars['Float'];
  createdDate: Scalars['DateTime'];
  deletedBy: Scalars['Float'];
  deletedDate: Scalars['DateTime'];
  id: Scalars['Float'];
  isPublic: Scalars['Boolean'];
  originId: Scalars['String'];
  payload?: Maybe<Scalars['JSON']>;
  type: Scalars['String'];
  updatedBy: Scalars['Float'];
  updatedDate: Scalars['DateTime'];
};

export type ConfigLogWhereInput = {
  originId: Scalars['String'];
};

export type ConfigObject = {
  __typename?: 'ConfigObject';
  createdBy: Scalars['Float'];
  createdDate: Scalars['DateTime'];
  deletedBy: Scalars['Float'];
  deletedDate: Scalars['DateTime'];
  id: Scalars['String'];
  isPublic: Scalars['Boolean'];
  payload?: Maybe<Scalars['JSON']>;
  type: Scalars['String'];
  updatedBy: Scalars['Float'];
  updatedDate: Scalars['DateTime'];
};

export type ConfigUniqueWhereInput = {
  id: Scalars['String'];
  isPublic: Scalars['Boolean'];
};

export type ConfigUpsertInput = {
  id: Scalars['String'];
  isPublic: Scalars['Boolean'];
  payload?: Maybe<Scalars['JSON']>;
  type: Scalars['String'];
};

export type ConfigWhereInput = {
  isPublic: Scalars['Boolean'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createToken: TokenObject;
  createUser: UserObject;
  deleteConfig: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  refreshToken: TokenObject;
  test: TestObject;
  updateUser: UserObject;
  upsertConfig: ConfigObject;
};


export type MutationCreateTokenArgs = {
  data: TokenCreateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteConfigArgs = {
  where: ConfigUniqueWhereInput;
};


export type MutationDeleteUserArgs = {
  where: UserWhereInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationTestArgs = {
  message: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereInput;
};


export type MutationUpsertConfigArgs = {
  data: ConfigUpsertInput;
};

export type Query = {
  __typename?: 'Query';
  config: ConfigObject;
  configLogs: Array<ConfigLogObject>;
  configs: Array<ConfigObject>;
  me: UserObject;
  test: TestObject;
  user: UserObject;
  users: Array<UserObject>;
};


export type QueryConfigArgs = {
  where: ConfigUniqueWhereInput;
};


export type QueryConfigLogsArgs = {
  before?: Maybe<Scalars['Float']>;
  take: Scalars['Float'];
  where: ConfigLogWhereInput;
};


export type QueryConfigsArgs = {
  where: ConfigWhereInput;
};


export type QueryTestArgs = {
  message: Scalars['String'];
};


export type QueryUserArgs = {
  where: UserWhereInput;
};


export type QueryUsersArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
  where?: Maybe<UserWhereInput>;
};

export type TestObject = {
  __typename?: 'TestObject';
  message: Scalars['String'];
};

export type TokenCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TokenObject = {
  __typename?: 'TokenObject';
  access_token: Scalars['String'];
  expires_in: Scalars['Float'];
  refresh_token: Scalars['String'];
  token: Scalars['String'];
  token_type: Scalars['String'];
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  payload?: Maybe<Scalars['JSON']>;
};

export type UserObject = {
  __typename?: 'UserObject';
  createdDate: Scalars['DateTime'];
  deletedDate: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  isAdmin: Scalars['Boolean'];
  payload?: Maybe<Scalars['JSON']>;
  updatedDate: Scalars['DateTime'];
};

export type UserUpdateInput = {
  password: Scalars['String'];
  payload?: Maybe<Scalars['JSON']>;
};

export type UserWhereInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
};

export type TestQueryVariables = Exact<{
  message: Scalars['String'];
}>;


export type TestQuery = { __typename?: 'Query', test: { __typename?: 'TestObject', message: string } };

export type UsersQueryVariables = Exact<{
  take: Scalars['Float'];
  skip: Scalars['Float'];
  where?: Maybe<UserWhereInput>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserObject', id: number, email: string, isAdmin: boolean, payload?: Maybe<any>, createdDate: any, updatedDate: any }> };

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserObject', id: number, email: string, isAdmin: boolean, payload?: Maybe<any>, createdDate: any, updatedDate: any } };

export type CreateTokenMutationVariables = Exact<{
  data: TokenCreateInput;
}>;


export type CreateTokenMutation = { __typename?: 'Mutation', createToken: { __typename?: 'TokenObject', access_token: string, refresh_token: string } };


export const TestDocument = gql`
    query Test($message: String!) {
  test(message: $message) {
    message
  }
}
    `;

/**
 * __useTestQuery__
 *
 * To run a query within a React component, call `useTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQuery({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useTestQuery(baseOptions: Apollo.QueryHookOptions<TestQuery, TestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestQuery, TestQueryVariables>(TestDocument, options);
      }
export function useTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestQuery, TestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestQuery, TestQueryVariables>(TestDocument, options);
        }
export type TestQueryHookResult = ReturnType<typeof useTestQuery>;
export type TestLazyQueryHookResult = ReturnType<typeof useTestLazyQuery>;
export type TestQueryResult = Apollo.QueryResult<TestQuery, TestQueryVariables>;
export const UsersDocument = gql`
    query Users($take: Float!, $skip: Float!, $where: UserWhereInput) {
  users(take: $take, skip: $skip, where: $where) {
    id
    email
    isAdmin
    payload
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserCreateInput!) {
  createUser(data: $data) {
    id
    email
    isAdmin
    payload
    createdDate
    updatedDate
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreateTokenDocument = gql`
    mutation CreateToken($data: TokenCreateInput!) {
  createToken(data: $data) {
    access_token
    refresh_token
  }
}
    `;
export type CreateTokenMutationFn = Apollo.MutationFunction<CreateTokenMutation, CreateTokenMutationVariables>;

/**
 * __useCreateTokenMutation__
 *
 * To run a mutation, you first call `useCreateTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTokenMutation, { data, loading, error }] = useCreateTokenMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTokenMutation(baseOptions?: Apollo.MutationHookOptions<CreateTokenMutation, CreateTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTokenMutation, CreateTokenMutationVariables>(CreateTokenDocument, options);
      }
export type CreateTokenMutationHookResult = ReturnType<typeof useCreateTokenMutation>;
export type CreateTokenMutationResult = Apollo.MutationResult<CreateTokenMutation>;
export type CreateTokenMutationOptions = Apollo.BaseMutationOptions<CreateTokenMutation, CreateTokenMutationVariables>;