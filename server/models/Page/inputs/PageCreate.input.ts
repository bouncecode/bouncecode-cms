import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@InputType()
export class PageCreateInput {
  @Field()
  id: string;

  @Field(() => GraphQLJSON)
  payload: object;
}
