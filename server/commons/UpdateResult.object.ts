/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.commons
 */

import { ObjectType, Field } from "type-graphql";
import { UpdateResult } from "typeorm";

/**
 * GraphQL Resolver 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class UpdateResultObject extends UpdateResult {
  /**
   * Number of affected rows/documents
   * Not all drivers support this
   */
  @Field()
  affected?: number;
}
