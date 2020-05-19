/**
 * GraphQL Resolver 를 실행하기 전에 권한을 확인하는 파일입니다.
 * {@link expressApp} 에서 GraphQL Resolver 를 실행하기 전에 권한을 확인할 때 사용됩니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.permissions
 * @preferred
 */

import { deny, allow, rule, shield, and, or, not } from "graphql-shield";
import { Context } from "../express";

/**
 * 권한을 확인하는 함수입니다.
 *
 * @author BounceCode, Inc.
 */
const rules = {
  /**
   * 로그인한 사용자인지 확인하는 함수입니다.
   *
   * @returns 로그인한 사용자인 경우 true
   * @author BounceCode, Inc.
   */
  isAuthorized: rule()(async (parent, args, ctx: Context, info) => {
    return Boolean(ctx.user?.id);
  }),

  /**
   * 관리자인지 확인하는 함수입니다.
   *
   * @returns 관리자인 경우 true
   * @author BounceCode, Inc.
   */
  isAdmin: rule()(async (parent, args, ctx: Context, info) => {
    return Boolean(ctx.user?.isAdmin);
  }),

  isPublic: rule()(async (parent, args, ctx: Context, info) => {
    return Boolean(args.where.isPublic);
  }),
};

/**
 * Resolver 에 {@link rules} 를 적용합니다.
 *
 * @author BounceCode, Inc.
 */
const ruleTree = {
  Query: {
    "*": deny,
    test: allow,
    me: rules.isAuthorized,
    user: rules.isAdmin,
    users: rules.isAdmin,
    config: or(rules.isPublic, rules.isAdmin),
    configs: or(rules.isAdmin),
    configLogs: rules.isAdmin,
  },
  Mutation: {
    "*": deny,
    test: allow,
    createToken: allow,
    refreshToken: allow,
    createUser: allow,
    updateUser: rules.isAdmin,
    upsertConfig: rules.isAdmin,
    deleteConfig: rules.isAdmin,
  },
};

/**
 * {@link ruleTree} 를 바탕으로 권한을 설정합니다.
 *
 * @author BounceCode, Inc.
 */
const permissions = shield(ruleTree);
export default permissions;
