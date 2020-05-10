import { Field, InputType } from "type-graphql";

@InputType()
export class BoardWhereInput {
  @Field()
  id: string;
}
