/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Config.objects
 */

import { ObjectType, Field, ID } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

/**
 * {@link ConfigResolver} 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class ConfigObject {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  isPublic: Boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  payload?: any;

  @Field()
  createdBy: number;

  @Field()
  updatedBy?: number;

  @Field()
  deletedBy?: number;

  @Field()
  createdDate: Date;

  @Field()
  updatedDate: Date;

  @Field()
  deletedDate: Date;
}
