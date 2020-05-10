import { ObjectType, Field } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class PopupObject {
  @Field()
  id: number;

  @Field(() => GraphQLJSON, { nullable: true })
  payload: object;
}
