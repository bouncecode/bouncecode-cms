import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class TestObject {
  @Field()
  message: string;
}
