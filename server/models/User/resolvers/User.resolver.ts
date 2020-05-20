/**
 * User 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.User.resolvers
 * @preferred
 */

import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { UserEntity } from "../entities/User.entity";
import { UserObject } from "../objects/User.object";
import { UserCreateInput } from "../inputs/UserCreate.input";
import { UserUpdateInput } from "../inputs/UserUpdate.input";
import { UserWhereInput } from "../inputs/UserWhere.input";
import { Context } from "../../../express";

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
    try {
      return await UserEntity.findOne({
        where: {
          id: ctx.user.id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * User 정보를 가져옵니다.
   *
   * @author BounceCode, Inc.
   */
  @Query(() => UserObject)
  async user(@Arg("where") where: UserWhereInput) {
    try {
      return await UserEntity.findOne({
        where,
      });
    } catch (e) {
      console.log(e);
    }
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
    try {
      return await UserEntity.find({
        where,
        skip,
        take,
      });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 새로운 User 를 만듭니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => UserObject)
  async createUser(@Arg("data") data: UserCreateInput) {
    try {
      return await UserEntity.create(data).save();
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * User 정보를 수정합니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => UserObject)
  async updateUser(
    @Arg("where") where: UserWhereInput,
    @Arg("data") data: UserUpdateInput
  ) {
    try {
      return await UserEntity.update(where, data);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * User 정보를 삭제합니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => Boolean)
  async deleteUser(@Arg("where") where: UserWhereInput) {
    try {
      return await UserEntity.delete(where);
    } catch (e) {
      console.log(e);
    }
  }
}
