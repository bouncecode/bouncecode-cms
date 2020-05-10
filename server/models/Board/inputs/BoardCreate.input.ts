import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@InputType()
export class BoardCreateInput {
  @Field()
  id: string;

  @Field(() => GraphQLJSON)
  payload: object;
}
