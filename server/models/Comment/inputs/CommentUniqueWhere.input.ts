import {Field, InputType} from 'type-graphql';

@InputType()
export class CommentUniqueWhereInput {
  @Field()
  id: number;
}
