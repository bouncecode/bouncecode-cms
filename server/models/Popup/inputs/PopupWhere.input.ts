import { Field, InputType } from "type-graphql";

@InputType()
export class PopupWhereInput {
  @Field()
  id: number;
}
