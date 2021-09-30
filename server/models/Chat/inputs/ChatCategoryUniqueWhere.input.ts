import {Field, InputType} from 'type-graphql';

@InputType()
export class ChatCategoryUniqueWhereInput {
  @Field()
  id: number;
}
