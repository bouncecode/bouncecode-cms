/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */
import {ObjectType, Field, Int} from 'type-graphql';

@ObjectType()
export class CommentStatObject {
  @Field()
  postId: string;

  @Field(() => Int)
  count: number;

  @Field(() => Int)
  version: number;

  @Field()
  createdDate: Date;

  @Field()
  updatedDate: Date;
}
