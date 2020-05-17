/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.User.objects
 */

import { ObjectType, Field, ID } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

/**
 * {@link UserResolver} 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class UserObject {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  isAdmin: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  payload?: any;

  @Field()
  createdDate: Date;

  @Field()
  updatedDate: Date;

  @Field()
  deletedDate: Date;
}
