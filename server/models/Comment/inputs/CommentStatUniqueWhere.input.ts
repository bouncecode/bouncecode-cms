import {Field, InputType} from 'type-graphql';

@InputType()
export class CommentStatUniqueWhereInput {
  @Field()
  postId: string;
}
