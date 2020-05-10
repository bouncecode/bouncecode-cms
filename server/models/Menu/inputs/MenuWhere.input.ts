import { Field, InputType } from "type-graphql";

@InputType()
export class MenuWhereInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  parentId?: number;
}
