import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { UserEntity } from "./User.entity";
import { UserObject } from "./User.object";
import { UserCreateInput, UserUpdateInput, UserWhereInput } from "./inputs";

@Resolver()
export default class UserResolver {
  @Query(() => UserObject)
  async user(@Arg("where") where: UserWhereInput) {
    return UserEntity.findOne({
      where,
    });
  }

  @Query(() => [UserObject])
  async users(
    @Arg("where", { nullable: true }) where: UserWhereInput,
    @Arg("skip") skip: number,
    @Arg("take") take: number
  ) {
    return UserEntity.find({
      where,
      skip,
      take,
    });
  }

  @Mutation(() => UserObject)
  async createUser(@Arg("data") data: UserCreateInput) {
    throw new Error("testmessage");
    return UserEntity.create(data).save();
  }

  @Mutation(() => UserObject)
  async updateUser(
    @Arg("where") where: UserWhereInput,
    @Arg("data") data: UserUpdateInput
  ) {
    return UserEntity.update(where, data);
  }
}
