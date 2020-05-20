/**
 * 테스트를 위한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Test.resolvers
 * @preferred
 */

import { Resolver, Mutation, Query, Arg } from "type-graphql";
import { TestObject } from "../objects/Test.object";

/**
 * Test 와 관련된 요청을 처리합니다.
 *
 * @author BounceCode, Inc.
 */
@Resolver()
export class TestResolver {
  /**
   * 입력한 데이터를 반환시킵니다.
   *
   * @author BounceCode, Inc.
   */
  @Query(() => TestObject)
  @Mutation(() => TestObject)
  async test(@Arg("message") message: string) {
    const testObject = new TestObject();
    testObject.message = message;
    return testObject;
  }
}
