import {Field, InputType} from 'type-graphql';

@InputType()
export class ChatRoomUniqueWhereInput {
  @Field()
  id: number;
}
