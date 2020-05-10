import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@InputType()
export class PopupUpdateInput {
  @Field(() => GraphQLJSON)
  payload: object;
}
