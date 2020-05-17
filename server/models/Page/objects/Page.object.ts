/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Page.objects
 */

import { ObjectType, Field } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

/**
 * {@link PageResolver} 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class PageObject {
  @Field()
  id: string;

  @Field(() => GraphQLJSON, { nullable: true })
  payload: object;
}
