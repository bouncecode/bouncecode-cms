import { Field, InputType } from "type-graphql";

@InputType()
export class TokenCreateInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
