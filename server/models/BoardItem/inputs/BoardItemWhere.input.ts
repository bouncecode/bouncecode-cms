import { Field, InputType } from "type-graphql";

@InputType()
export class BoardItemWhereInput {
  @Field()
  id: number;
}
