import GraphQLJSON from 'graphql-type-json';
import {Field, Float, InputType, Int} from 'type-graphql';

@InputType()
export class CommentUpdateInput {
  @Field()
  postId: string;

  @Field(() => Int, {nullable: true})
  parentId?: number;

  @Field()
  text: string;

  @Field(() => GraphQLJSON)
  payload: any;
}
