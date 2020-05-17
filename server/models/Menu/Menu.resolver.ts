/**
 * Menu 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Menu
 * @preferred
 */

import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { MenuEntity } from "./Menu.entity";
import { MenuObject } from "./objects/Menu.object";
import { MenuCreateInput } from "./inputs/MenuCreate.input";
import { MenuUpdateInput } from "./inputs/MenuUpdate.input";
import { MenuWhereInput } from "./inputs/MenuWhere.input";
import { DeleteResultObject } from "../../commons/DeleteResult.object";

@Resolver()
export class MenuResolver {
  @Query(() => MenuObject)
  async board(@Arg("where") where: MenuWhereInput) {
    return MenuEntity.findOne({
      where,
    });
  }

  @Query(() => [MenuObject])
  async boards(
    @Arg("where", { nullable: true }) where: MenuWhereInput,
    @Arg("skip") skip: number,
    @Arg("take") take: number
  ) {
    return MenuEntity.find({
      where,
      skip,
      take,
    });
  }

  @Mutation(() => MenuObject)
  async createBoard(@Arg("data") data: MenuCreateInput) {
    return MenuEntity.create(data).save();
  }

  @Mutation(() => MenuObject)
  async updateBoard(
    @Arg("where") where: MenuWhereInput,
    @Arg("data") data: MenuUpdateInput
  ) {
    return MenuEntity.update(where, data);
  }

  @Mutation(() => DeleteResultObject)
  async deleteBoard(@Arg("where") where: MenuWhereInput) {
    return MenuEntity.delete(where);
  }
}
