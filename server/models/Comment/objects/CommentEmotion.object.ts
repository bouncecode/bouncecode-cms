/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */
import {ObjectType, Field, Int, Float} from 'type-graphql';

@ObjectType()
export class CommentEmotionObject {
  @Field(() => Int)
  id: number;

  // 댓글
  @Field(() => Int)
  commentId: number;

  // 작성자
  @Field(() => Int)
  userId: number;

  // 행동
  @Field()
  emotion: string;

  @Field(() => Int)
  version: number;

  @Field()
  createdDate: Date;

  @Field()
  updatedDate: Date;

  @Field()
  deletedDate: Date;
}
