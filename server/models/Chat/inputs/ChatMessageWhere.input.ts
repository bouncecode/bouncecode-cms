import {Field, InputType} from 'type-graphql';
import {ChatRoomUniqueWhereInput} from './ChatRoomUniqueWhere.input';

@InputType()
export class ChatMessageWhereInput {
  @Field({nullable: true})
  room?: ChatRoomUniqueWhereInput;
}
