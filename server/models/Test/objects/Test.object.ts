/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Test.objects
 */
import { ObjectType, Field } from "type-graphql";

/**
 * {@link TestResolver} 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class TestObject {
  @Field()
  message: string;
}
