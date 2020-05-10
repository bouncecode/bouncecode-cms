import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@InputType()
export class UserCreateInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => GraphQLJSON, { nullable: true })
  payload?: object;
}
