import { BaseEntity } from "typeorm";
import { Field, InputType } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@InputType()
export class BoardItemCreateInput extends BaseEntity {
  @Field()
  boardId: string;

  @Field(() => GraphQLJSON)
  payload: object;
}
