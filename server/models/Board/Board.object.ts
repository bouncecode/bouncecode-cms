import { ObjectType, Field } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class BoardObject {
  @Field()
  id: string;

  @Field(() => GraphQLJSON, { nullable: true })
  payload: object;
}
