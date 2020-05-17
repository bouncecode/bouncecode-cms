/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Menu.inputs
 */

import { Field, InputType } from "type-graphql";

/**
 * {@link MenuResolver} 에서 입력된 데이터를 확인하기위한 InputType 입니다.
 *
 * @author BounceCode, Inc.
 */
@InputType()
export class MenuWhereInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  parentId?: number;
}
