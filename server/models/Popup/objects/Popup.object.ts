/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Popup.objects
 */

import { ObjectType, Field } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

/**
 * {@link PopupResolver} 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class PopupObject {
  @Field()
  id: number;

  @Field(() => GraphQLJSON, { nullable: true })
  payload: object;
}
