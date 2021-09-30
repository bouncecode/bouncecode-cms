import {Field, InputType} from 'type-graphql';

@InputType()
export class ChatMessageUniqueWhereInput {
  @Field()
  id: number;
}
