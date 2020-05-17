/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Menu.objects
 */

import { ObjectType, Field } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

/**
 * {@link MenuResolver} 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class MenuObject {
  @Field()
  id: number;

  @Field({ nullable: true })
  parentId?: number;

  @Field()
  index: number;

  @Field(() => GraphQLJSON, { nullable: true })
  payload?: any;
}
