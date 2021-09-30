import GraphQLJSON from 'graphql-type-json';
import {Field, InputType} from 'type-graphql';
import {ChatCategoryUniqueWhereInput} from './ChatCategoryUniqueWhere.input';
import {UserUniqueWhereInput} from '../../User/inputs/UserUniqueWhere.input';

@InputType()
export class ChatMessageCreateInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({nullable: true})
  category?: ChatCategoryUniqueWhereInput;

  @Field(() => [UserUniqueWhereInput])
  attendees: UserUniqueWhereInput[];

  @Field(() => GraphQLJSON)
  payload: any;
}
