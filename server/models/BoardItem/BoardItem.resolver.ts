/**
 * BoardItem 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.BoardItem
 * @preferred
 */

import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { BoardItemEntity } from "./BoardItem.entity";
import { BoardItemObject } from "./objects/BoardItem.object";
import { BoardItemCreateInput } from "./inputs/BoardItemCreate.input";
import { BoardItemUpdateInput } from "./inputs/BoardItemUpdate.input";
import { BoardItemWhereInput } from "./inputs/BoardItemWhere.input";
import { DeleteResultObject } from "../../commons/DeleteResult.object";

@Resolver()
export class BoardItemResolver {
  @Query(() => BoardItemObject)
  async boardItem(@Arg("where") where: BoardItemWhereInput) {
    return BoardItemEntity.findOne({
      where,
    });
  }

  @Query(() => [BoardItemObject])
  async boardItems(
    @Arg("where", { nullable: true }) where: BoardItemWhereInput,
    @Arg("skip") skip: number,
    @Arg("take") take: number
  ) {
    return BoardItemEntity.find({
      where,
      skip,
      take,
    });
  }

  @Mutation(() => BoardItemObject)
  async createBoardItem(@Arg("data") data: BoardItemCreateInput) {
    return BoardItemEntity.create(data).save();
  }

  @Mutation(() => BoardItemObject)
  async updateBoardItem(
    @Arg("where") where: BoardItemWhereInput,
    @Arg("data") data: BoardItemUpdateInput
  ) {
    return BoardItemEntity.update(where, data);
  }

  @Mutation(() => DeleteResultObject)
  async deleteBoardItem(@Arg("where") where: BoardItemWhereInput) {
    return BoardItemEntity.delete(where);
  }
}
