/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Board.objects
 */

import { ObjectType, Field } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

/**
 * {@link BoardResolver} 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class BoardObject {
  @Field()
  id: string;

  @Field(() => GraphQLJSON, { nullable: true })
  payload: object;
}
