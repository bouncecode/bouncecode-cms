/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server
 */

import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { buildSchemaSync, NonEmptyArray } from "type-graphql";
import permissions from "./permissions";
import parseAuthHeader from "./lib/parseAuthHeader";
import connectDatabase from "./lib/connectDatabase";

/**
 * GraphQL Resolver 에 해당하는 모든 파일을 가져옵니다.
 *
 * @author BounceCode, Inc.
 */
const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  __dirname + "/models/**/*.resolver.{ts,js}",
];

/**
 * {@link resolvers} 에 해당하는 모든 파일을 GraphQL Resolver 로 선언합니다.
 * GraphQL Resolver 는 {@link permissions} 의 규칙을 통과해야 실행됩니다.
 *
 * @author BounceCode, Inc.
 */
const schema = applyMiddleware(
  buildSchemaSync({
    resolvers,
  }),
  permissions
);

/**
 * Context 에 대한 interface 입니다.
 *
 * @name user 인증된 사용자인 경우 사용자 정보가 담겨있습니다.
 * @author BounceCode, Inc.
 */
export interface Context {
  user?: any;
}

/**
 * {@link connectDatabase} 로 데이터베이스와 연결하고
 * {@link parseAuthHeader} 로 인증 권한을 확인하는 함수입니다.
 * 인증 정보를  {@link Context.user} 에 저장합니다.
 *
 * @author BounceCode, Inc.
 */
const context = async ({ req }): Promise<Partial<Context>> => {
  await connectDatabase();
  const user = await parseAuthHeader(req.headers.authorization);
  return { ...req, user };
};

/**
 * GraphQL 서버를 실행합니다.
 *
 * @author BounceCode, Inc.
 */
const server = new ApolloServer({
  schema,
  context,
});

/**
 * Express 서버를 실행합니다.
 *
 * @author BounceCode, Inc.
 */
const expressApp = express();
server.applyMiddleware({ app: expressApp });
export default expressApp;
