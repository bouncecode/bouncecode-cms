import { ObjectType, Field } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class BoardItemObject {
  @Field()
  id: number;

  @Field()
  boardId: string;

  @Field(() => GraphQLJSON, { nullable: true })
  payload: object;
}
