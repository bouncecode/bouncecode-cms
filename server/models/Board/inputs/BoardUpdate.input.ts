/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Board.inputs
 */

import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

/**
 * {@link BoardResolver} 에서 입력된 데이터를 확인하기위한 InputType 입니다.
 *
 * @author BounceCode, Inc.
 */
@InputType()
export class BoardUpdateInput {
  @Field(() => GraphQLJSON)
  payload: object;
}
