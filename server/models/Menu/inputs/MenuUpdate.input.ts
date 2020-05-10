import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@InputType()
export class MenuUpdateInput {
  @Field({ nullable: true })
  parentId?: number;

  @Field({ nullable: true })
  index?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  payload?: object;
}
