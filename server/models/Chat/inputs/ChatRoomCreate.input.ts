import GraphQLJSON from 'graphql-type-json';
import {UserUniqueWhereInput} from '../../User/inputs/UserUniqueWhere.input';
import {Field, InputType} from 'type-graphql';
import {ChatCategoryUniqueWhereInput} from './ChatCategoryUniqueWhere.input';

@InputType()
export class ChatRoomCreateInput {
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
