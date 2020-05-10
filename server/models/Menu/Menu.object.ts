import { ObjectType, Field } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class MenuObject {
  @Field()
  id: number;

  @Field({ nullable: true })
  parentId?: number;

  @Field()
  index: number;

  @Field(() => GraphQLJSON)
  payload: object;
}
