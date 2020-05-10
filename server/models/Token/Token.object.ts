import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class TokenObject {
  @Field()
  token: string;

  @Field()
  access_token: string;

  @Field()
  refresh_token: string;

  @Field()
  expires_in: number;

  @Field()
  token_type: string;
}
