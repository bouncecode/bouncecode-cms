import { Field, InputType } from "type-graphql";

@InputType()
export class PageWhereInput {
  @Field()
  id: string;
}
