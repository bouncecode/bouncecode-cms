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

export type ChatCategoryUniqueWhereInput = {
  id: Scalars['Float'];
};

export type ChatRoomCreateInput = {
  attendees: Array<UserUniqueWhereInput>;
  category?: Maybe<ChatCategoryUniqueWhereInput>;
  description: Scalars['String'];
  id: Scalars['String'];
  payload: Scalars['JSON'];
  title: Scalars['String'];
};

export type ChatRoomObject = {
  __typename?: 'ChatRoomObject';
  createdDate: Scalars['DateTime'];
  id: Scalars['Float'];
  message: Scalars['String'];
  payload: Scalars['JSON'];
  room: ChatRoomObject;
  updatedDate: Scalars['DateTime'];
  user: UserObject;
  version: Scalars['Float'];
};

export type ChatRoomUniqueWhereInput = {
  id: Scalars['Float'];
};

export type ChatRoomUpdateInput = {
  attendees: Array<UserUniqueWhereInput>;
  category?: Maybe<ChatCategoryUniqueWhereInput>;
  description: Scalars['String'];
  payload: Scalars['JSON'];
  title: Scalars['String'];
};

export type ChatRoomWhereInput = {
  category?: Maybe<ChatCategoryUniqueWhereInput>;
};

export type CommentCreateInput = {
  parentId?: Maybe<Scalars['Int']>;
  payload: Scalars['JSON'];
  postId: Scalars['String'];
  text: Scalars['String'];
};

export enum CommentEmotionEnum {
  Like = 'LIKE',
  Unlike = 'UNLIKE'
}

export type CommentEmotionInput = {
  emotion: CommentEmotionEnum;
};

export type CommentEmotionObject = {
  __typename?: 'CommentEmotionObject';
  commentId: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  deletedDate: Scalars['DateTime'];
  emotion: Scalars['String'];
  id: Scalars['Int'];
  updatedDate: Scalars['DateTime'];
  userId: Scalars['Int'];
  version: Scalars['Int'];
};

export type CommentObject = {
  __typename?: 'CommentObject';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  like?: Maybe<Scalars['Int']>;
  parentId?: Maybe<Scalars['Int']>;
  payload: Scalars['JSON'];
  postId: Scalars['String'];
  text: Scalars['String'];
  unlike?: Maybe<Scalars['Int']>;
  updatedDate: Scalars['DateTime'];
  user: UserObject;
  version: Scalars['Int'];
};

export type CommentStatObject = {
  __typename?: 'CommentStatObject';
  count: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  postId: Scalars['String'];
  updatedDate: Scalars['DateTime'];
  version: Scalars['Int'];
};

export type CommentStatUniqueWhereInput = {
  postId: Scalars['String'];
};

export type CommentUniqueWhereInput = {
  id: Scalars['Float'];
};

export type CommentUpdateInput = {
  parentId?: Maybe<Scalars['Int']>;
  payload: Scalars['JSON'];
  postId: Scalars['String'];
  text: Scalars['String'];
};

export type CommentWhereInput = {
  postId?: Maybe<Scalars['String']>;
  user?: Maybe<UserUniqueWhereInput>;
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
  commentCreate: CommentObject;
  commentDelete: Scalars['Float'];
  commentEmotion: CommentObject;
  commentEmotionUndo: CommentObject;
  commentUpdate: CommentObject;
  createChatRoom: Scalars['Boolean'];
  createToken: TokenObject;
  createUser: UserObject;
  deleteChatRoom: Scalars['Boolean'];
  deleteConfig: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  refreshToken: TokenObject;
  test: TestObject;
  updateChatRoom: Scalars['Boolean'];
  updateUser: UserObject;
  upsertConfig: ConfigObject;
};


export type MutationCommentCreateArgs = {
  data: CommentCreateInput;
};


export type MutationCommentDeleteArgs = {
  where: CommentUniqueWhereInput;
};


export type MutationCommentEmotionArgs = {
  data: CommentEmotionInput;
  where: CommentUniqueWhereInput;
};


export type MutationCommentEmotionUndoArgs = {
  where: CommentUniqueWhereInput;
};


export type MutationCommentUpdateArgs = {
  data: CommentUpdateInput;
  where: CommentUniqueWhereInput;
};


export type MutationCreateChatRoomArgs = {
  data: ChatRoomCreateInput;
};


export type MutationCreateTokenArgs = {
  data: TokenCreateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteChatRoomArgs = {
  where: ChatRoomUniqueWhereInput;
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


export type MutationUpdateChatRoomArgs = {
  data: ChatRoomUpdateInput;
  where: ChatRoomUniqueWhereInput;
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
  chatRooms: Array<ChatRoomObject>;
  commentMyEmotion?: Maybe<CommentEmotionObject>;
  comments: Array<CommentObject>;
  commentStat?: Maybe<CommentStatObject>;
  config: ConfigObject;
  configLogs: Array<ConfigLogObject>;
  configs: Array<ConfigObject>;
  me: UserObject;
  test: TestObject;
  user: UserObject;
  users: Array<UserObject>;
};


export type QueryChatRoomsArgs = {
  skip?: Maybe<Scalars['Float']>;
  take?: Maybe<Scalars['Float']>;
  where: ChatRoomWhereInput;
};


export type QueryCommentMyEmotionArgs = {
  where: CommentUniqueWhereInput;
};


export type QueryCommentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  where: CommentWhereInput;
};


export type QueryCommentStatArgs = {
  where: CommentStatUniqueWhereInput;
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
  skip: Scalars['Int'];
  take: Scalars['Int'];
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
  email: Scalars['String'];
  id: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  payload?: Maybe<Scalars['JSON']>;
  updatedDate: Scalars['DateTime'];
};

export type UserUniqueWhereInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
};

export type UserUpdateInput = {
  password: Scalars['String'];
  payload?: Maybe<Scalars['JSON']>;
};

export type UserWhereInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
};

export type CommentsQueryVariables = Exact<{
  where: CommentWhereInput;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'CommentObject', id: number, postId: string, parentId?: Maybe<number>, text: string, like?: Maybe<number>, unlike?: Maybe<number>, payload: any, version: number, createdDate: any, updatedDate: any, user: { __typename?: 'UserObject', id: number, email: string, isAdmin: boolean, payload?: Maybe<any>, createdDate: any, updatedDate: any } }> };

export type CommentCreateMutationVariables = Exact<{
  data: CommentCreateInput;
}>;


export type CommentCreateMutation = { __typename?: 'Mutation', commentCreate: { __typename?: 'CommentObject', id: number } };

export type CommentUpdateMutationVariables = Exact<{
  where: CommentUniqueWhereInput;
  data: CommentUpdateInput;
}>;


export type CommentUpdateMutation = { __typename?: 'Mutation', commentUpdate: { __typename?: 'CommentObject', id: number, postId: string, parentId?: Maybe<number>, text: string, payload: any } };

export type CommentDeleteMutationVariables = Exact<{
  where: CommentUniqueWhereInput;
}>;


export type CommentDeleteMutation = { __typename?: 'Mutation', commentDelete: number };

export type CommentMyEmotionQueryVariables = Exact<{
  where: CommentUniqueWhereInput;
}>;


export type CommentMyEmotionQuery = { __typename?: 'Query', commentMyEmotion?: Maybe<{ __typename?: 'CommentEmotionObject', id: number, emotion: string }> };

export type CommentEmotionMutationVariables = Exact<{
  where: CommentUniqueWhereInput;
  data: CommentEmotionInput;
}>;


export type CommentEmotionMutation = { __typename?: 'Mutation', commentEmotion: { __typename?: 'CommentObject', id: number, like?: Maybe<number>, unlike?: Maybe<number> } };

export type CommentEmotionUndoMutationVariables = Exact<{
  where: CommentUniqueWhereInput;
}>;


export type CommentEmotionUndoMutation = { __typename?: 'Mutation', commentEmotionUndo: { __typename?: 'CommentObject', id: number, like?: Maybe<number>, unlike?: Maybe<number> } };

export type CommentStatQueryVariables = Exact<{
  where: CommentStatUniqueWhereInput;
}>;


export type CommentStatQuery = { __typename?: 'Query', commentStat?: Maybe<{ __typename?: 'CommentStatObject', postId: string, count: number, version: number, createdDate: any, updatedDate: any }> };

export type TestQueryVariables = Exact<{
  message: Scalars['String'];
}>;


export type TestQuery = { __typename?: 'Query', test: { __typename?: 'TestObject', message: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserObject', id: number, email: string, isAdmin: boolean, payload?: Maybe<any>, createdDate: any, updatedDate: any } };

export type UsersQueryVariables = Exact<{
  where?: Maybe<UserWhereInput>;
  take: Scalars['Int'];
  skip: Scalars['Int'];
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


export const CommentsDocument = gql`
    query Comments($where: CommentWhereInput!, $skip: Int, $take: Int) {
  comments(where: $where, skip: $skip, take: $take) {
    id
    postId
    parentId
    text
    like
    unlike
    payload
    user {
      id
      email
      isAdmin
      payload
      createdDate
      updatedDate
    }
    version
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CommentCreateDocument = gql`
    mutation CommentCreate($data: CommentCreateInput!) {
  commentCreate(data: $data) {
    id
  }
}
    `;
export type CommentCreateMutationFn = Apollo.MutationFunction<CommentCreateMutation, CommentCreateMutationVariables>;

/**
 * __useCommentCreateMutation__
 *
 * To run a mutation, you first call `useCommentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentCreateMutation, { data, loading, error }] = useCommentCreateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCommentCreateMutation(baseOptions?: Apollo.MutationHookOptions<CommentCreateMutation, CommentCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentCreateMutation, CommentCreateMutationVariables>(CommentCreateDocument, options);
      }
export type CommentCreateMutationHookResult = ReturnType<typeof useCommentCreateMutation>;
export type CommentCreateMutationResult = Apollo.MutationResult<CommentCreateMutation>;
export type CommentCreateMutationOptions = Apollo.BaseMutationOptions<CommentCreateMutation, CommentCreateMutationVariables>;
export const CommentUpdateDocument = gql`
    mutation CommentUpdate($where: CommentUniqueWhereInput!, $data: CommentUpdateInput!) {
  commentUpdate(where: $where, data: $data) {
    id
    postId
    parentId
    text
    payload
  }
}
    `;
export type CommentUpdateMutationFn = Apollo.MutationFunction<CommentUpdateMutation, CommentUpdateMutationVariables>;

/**
 * __useCommentUpdateMutation__
 *
 * To run a mutation, you first call `useCommentUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentUpdateMutation, { data, loading, error }] = useCommentUpdateMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCommentUpdateMutation(baseOptions?: Apollo.MutationHookOptions<CommentUpdateMutation, CommentUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentUpdateMutation, CommentUpdateMutationVariables>(CommentUpdateDocument, options);
      }
export type CommentUpdateMutationHookResult = ReturnType<typeof useCommentUpdateMutation>;
export type CommentUpdateMutationResult = Apollo.MutationResult<CommentUpdateMutation>;
export type CommentUpdateMutationOptions = Apollo.BaseMutationOptions<CommentUpdateMutation, CommentUpdateMutationVariables>;
export const CommentDeleteDocument = gql`
    mutation CommentDelete($where: CommentUniqueWhereInput!) {
  commentDelete(where: $where)
}
    `;
export type CommentDeleteMutationFn = Apollo.MutationFunction<CommentDeleteMutation, CommentDeleteMutationVariables>;

/**
 * __useCommentDeleteMutation__
 *
 * To run a mutation, you first call `useCommentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentDeleteMutation, { data, loading, error }] = useCommentDeleteMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCommentDeleteMutation(baseOptions?: Apollo.MutationHookOptions<CommentDeleteMutation, CommentDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentDeleteMutation, CommentDeleteMutationVariables>(CommentDeleteDocument, options);
      }
export type CommentDeleteMutationHookResult = ReturnType<typeof useCommentDeleteMutation>;
export type CommentDeleteMutationResult = Apollo.MutationResult<CommentDeleteMutation>;
export type CommentDeleteMutationOptions = Apollo.BaseMutationOptions<CommentDeleteMutation, CommentDeleteMutationVariables>;
export const CommentMyEmotionDocument = gql`
    query CommentMyEmotion($where: CommentUniqueWhereInput!) {
  commentMyEmotion(where: $where) {
    id
    emotion
  }
}
    `;

/**
 * __useCommentMyEmotionQuery__
 *
 * To run a query within a React component, call `useCommentMyEmotionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentMyEmotionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentMyEmotionQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCommentMyEmotionQuery(baseOptions: Apollo.QueryHookOptions<CommentMyEmotionQuery, CommentMyEmotionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentMyEmotionQuery, CommentMyEmotionQueryVariables>(CommentMyEmotionDocument, options);
      }
export function useCommentMyEmotionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentMyEmotionQuery, CommentMyEmotionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentMyEmotionQuery, CommentMyEmotionQueryVariables>(CommentMyEmotionDocument, options);
        }
export type CommentMyEmotionQueryHookResult = ReturnType<typeof useCommentMyEmotionQuery>;
export type CommentMyEmotionLazyQueryHookResult = ReturnType<typeof useCommentMyEmotionLazyQuery>;
export type CommentMyEmotionQueryResult = Apollo.QueryResult<CommentMyEmotionQuery, CommentMyEmotionQueryVariables>;
export const CommentEmotionDocument = gql`
    mutation CommentEmotion($where: CommentUniqueWhereInput!, $data: CommentEmotionInput!) {
  commentEmotion(where: $where, data: $data) {
    id
    like
    unlike
  }
}
    `;
export type CommentEmotionMutationFn = Apollo.MutationFunction<CommentEmotionMutation, CommentEmotionMutationVariables>;

/**
 * __useCommentEmotionMutation__
 *
 * To run a mutation, you first call `useCommentEmotionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentEmotionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentEmotionMutation, { data, loading, error }] = useCommentEmotionMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCommentEmotionMutation(baseOptions?: Apollo.MutationHookOptions<CommentEmotionMutation, CommentEmotionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentEmotionMutation, CommentEmotionMutationVariables>(CommentEmotionDocument, options);
      }
export type CommentEmotionMutationHookResult = ReturnType<typeof useCommentEmotionMutation>;
export type CommentEmotionMutationResult = Apollo.MutationResult<CommentEmotionMutation>;
export type CommentEmotionMutationOptions = Apollo.BaseMutationOptions<CommentEmotionMutation, CommentEmotionMutationVariables>;
export const CommentEmotionUndoDocument = gql`
    mutation CommentEmotionUndo($where: CommentUniqueWhereInput!) {
  commentEmotionUndo(where: $where) {
    id
    like
    unlike
  }
}
    `;
export type CommentEmotionUndoMutationFn = Apollo.MutationFunction<CommentEmotionUndoMutation, CommentEmotionUndoMutationVariables>;

/**
 * __useCommentEmotionUndoMutation__
 *
 * To run a mutation, you first call `useCommentEmotionUndoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentEmotionUndoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentEmotionUndoMutation, { data, loading, error }] = useCommentEmotionUndoMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCommentEmotionUndoMutation(baseOptions?: Apollo.MutationHookOptions<CommentEmotionUndoMutation, CommentEmotionUndoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentEmotionUndoMutation, CommentEmotionUndoMutationVariables>(CommentEmotionUndoDocument, options);
      }
export type CommentEmotionUndoMutationHookResult = ReturnType<typeof useCommentEmotionUndoMutation>;
export type CommentEmotionUndoMutationResult = Apollo.MutationResult<CommentEmotionUndoMutation>;
export type CommentEmotionUndoMutationOptions = Apollo.BaseMutationOptions<CommentEmotionUndoMutation, CommentEmotionUndoMutationVariables>;
export const CommentStatDocument = gql`
    query CommentStat($where: CommentStatUniqueWhereInput!) {
  commentStat(where: $where) {
    postId
    count
    version
    createdDate
    updatedDate
  }
}
    `;

/**
 * __useCommentStatQuery__
 *
 * To run a query within a React component, call `useCommentStatQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentStatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentStatQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCommentStatQuery(baseOptions: Apollo.QueryHookOptions<CommentStatQuery, CommentStatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentStatQuery, CommentStatQueryVariables>(CommentStatDocument, options);
      }
export function useCommentStatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentStatQuery, CommentStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentStatQuery, CommentStatQueryVariables>(CommentStatDocument, options);
        }
export type CommentStatQueryHookResult = ReturnType<typeof useCommentStatQuery>;
export type CommentStatLazyQueryHookResult = ReturnType<typeof useCommentStatLazyQuery>;
export type CommentStatQueryResult = Apollo.QueryResult<CommentStatQuery, CommentStatQueryVariables>;
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
export const MeDocument = gql`
    query Me {
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query Users($where: UserWhereInput, $take: Int!, $skip: Int!) {
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
 *      where: // value for 'where'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
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