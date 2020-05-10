import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class DeleteResultObject {
  @Field()
  affected?: number | null;
}
