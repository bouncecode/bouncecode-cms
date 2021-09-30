import {Field, InputType} from 'type-graphql';
import {ChatCategoryUniqueWhereInput} from './ChatCategoryUniqueWhere.input';

@InputType()
export class ChatRoomWhereInput {
  @Field({nullable: true})
  category?: ChatCategoryUniqueWhereInput;
}
