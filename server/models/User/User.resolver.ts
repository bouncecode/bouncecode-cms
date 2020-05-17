/**
 * User 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.User
 * @preferred
 */

import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { UserEntity } from "./User.entity";
import { UserObject } from "./objects/User.object";
import { UserCreateInput } from "./inputs/UserCreate.input";
import { UserUpdateInput } from "./inputs/UserUpdate.input";
import { UserWhereInput } from "./inputs/UserWhere.input";
import { Context } from "../../express";
import { UpdateResultObject } from "../../commons/UpdateResult.object";

/**
 * User 와 관련된 요청을 처리합니다.
 *
 * @author BounceCode, Inc.
 */
@Resolver()
export class UserResolver {
  /**
   * 자신의 정보를 가져옵니다.
   *
   * @author BounceCode, Inc.
   */
  @Query(() => UserObject)
  async me(@Ctx() ctx: Context) {
    return UserEntity.findOne({
      where: {
        id: ctx.user.id,
      },
    });
  }

  /**
   * User 정보를 가져옵니다.
   *
   * @author BounceCode, Inc.
   */
  @Query(() => UserObject)
  async user(@Arg("where") where: UserWhereInput) {
    return UserEntity.findOne({
      where,
    });
  }

  /**
   * User 정보 목록을 가져옵니다.
   *
   * @author BounceCode, Inc.
   */
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

  /**
   * 새로운 User 를 만듭니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => UserObject)
  async createUser(@Arg("data") data: UserCreateInput) {
    return UserEntity.create(data).save();
  }

  /**
   * User 정보를 수정합니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => UpdateResultObject)
  async updateUser(
    @Arg("where") where: UserWhereInput,
    @Arg("data") data: UserUpdateInput
  ) {
    return UserEntity.update(where, data);
  }
}
