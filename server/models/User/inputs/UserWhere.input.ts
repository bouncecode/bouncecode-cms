import { Field, InputType } from "type-graphql";

@InputType()
export class UserWhereInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  username?: string;
}
