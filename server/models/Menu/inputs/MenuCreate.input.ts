/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Menu.inputs
 */

import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

/**
 * {@link MenuResolver} 에서 입력된 데이터를 확인하기위한 InputType 입니다.
 *
 * @author BounceCode, Inc.
 */
@InputType()
export class MenuCreateInput {
  @Field({ nullable: true })
  parentId?: number;

  @Field()
  index: number;

  @Field(() => GraphQLJSON, { nullable: true })
  payload?: any;
}
