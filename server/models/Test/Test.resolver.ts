import { Resolver, Mutation, Query, Arg } from "type-graphql";
import { TestObject } from "./Test.object";

@Resolver()
export class TestResolver {
  @Query(() => TestObject)
  @Mutation(() => TestObject)
  async test(@Arg("message") message: string) {
    const testObject = new TestObject();
    testObject.message = message;
    return testObject;
  }
}
