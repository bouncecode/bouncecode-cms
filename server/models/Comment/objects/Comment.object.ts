/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */
import GraphQLJSON from 'graphql-type-json';
import {UserObject} from '../../User/objects/User.object';
import {ObjectType, Field, Int, Float} from 'type-graphql';

@ObjectType()
export class CommentObject {
  @Field(() => Int)
  id: number;

  @Field()
  postId: string;

  @Field(() => Int, {nullable: true})
  parentId?: number;

  @Field()
  text: string;

  @Field(() => Int, {defaultValue: 0})
  like: number;

  @Field(() => Int, {defaultValue: 0})
  unlike: number;

  @Field(type => GraphQLJSON)
  payload: any;

  @Field()
  user: UserObject;

  @Field(() => Int)
  version: number;

  @Field()
  createdDate: Date;

  @Field()
  updatedDate: Date;
}
