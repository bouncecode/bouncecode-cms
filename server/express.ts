import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { applyMiddleware } from "graphql-middleware";
import { buildSchemaSync } from "type-graphql";
import permissions from "./permissions";
import parseAuthHeader from "./lib/parseAuthHeader";
import connectDatabase from "./lib/connectDatabase";

const schema = applyMiddleware(
  buildSchemaSync({
    resolvers: [__dirname + "/models/**/*.resolver.{ts,js}"],
  }),
  permissions
);

export interface Context {
  user?: any;
}

const context = async ({ req }): Promise<Partial<Context>> => {
  await connectDatabase();
  const user = await parseAuthHeader(req.headers.authorization);
  return { ...req, user };
};

const server = new ApolloServer({
  schema,
  context,
});

const app = express();
server.applyMiddleware({ app });
export default app;
