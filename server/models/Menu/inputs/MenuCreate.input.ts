import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@InputType()
export class MenuCreateInput {
  @Field({ nullable: true })
  parentId?: number;

  @Field()
  index: number;

  @Field(() => GraphQLJSON)
  payload: object;
}
