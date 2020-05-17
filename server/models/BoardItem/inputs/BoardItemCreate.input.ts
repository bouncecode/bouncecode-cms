/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.BoardItem.inputs
 */

import { BaseEntity } from "typeorm";
import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

/**
 * {@link BoardItemResolver} 에서 입력된 데이터를 확인하기위한 InputType 입니다.
 *
 * @author BounceCode, Inc.
 */
@InputType()
export class BoardItemCreateInput extends BaseEntity {
  @Field()
  boardId: string;

  @Field(() => GraphQLJSON, { nullable: true })
  payload?: any;
}
