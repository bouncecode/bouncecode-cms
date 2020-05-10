import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@InputType()
export class BoardUpdateInput {
  @Field(() => GraphQLJSON)
  payload: object;
}
