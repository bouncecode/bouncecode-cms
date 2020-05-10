import { ObjectType, Field, ID } from "type-graphql";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class UserObject {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  isAdmin: boolean;

  @Field(() => GraphQLJSON, { nullable: true })
  payload?: object;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
