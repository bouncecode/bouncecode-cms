/**
 * Board 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Board
 * @preferred
 */

import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { BoardEntity } from "./Board.entity";
import { BoardObject } from "./objects/Board.object";
import { BoardCreateInput } from "./inputs/BoardCreate.input";
import { BoardUpdateInput } from "./inputs/BoardUpdate.input";
import { BoardWhereInput } from "./inputs/BoardWhere.input";
import { DeleteResultObject } from "../../commons/DeleteResult.object";

@Resolver()
export class BoardResolver {
  @Query(() => BoardObject)
  async board(@Arg("where") where: BoardWhereInput) {
    return BoardEntity.findOne({
      where,
    });
  }

  @Query(() => [BoardObject])
  async boards(
    @Arg("where", { nullable: true }) where: BoardWhereInput,
    @Arg("skip") skip: number,
    @Arg("take") take: number
  ) {
    return BoardEntity.find({
      where,
      skip,
      take,
    });
  }

  @Mutation(() => BoardObject)
  async createBoard(@Arg("data") data: BoardCreateInput) {
    return BoardEntity.create(data).save();
  }

  @Mutation(() => BoardObject)
  async updateBoard(
    @Arg("where") where: BoardWhereInput,
    @Arg("data") data: BoardUpdateInput
  ) {
    return BoardEntity.update(where, data);
  }

  @Mutation(() => DeleteResultObject)
  async deleteBoard(@Arg("where") where: BoardWhereInput) {
    return BoardEntity.delete(where);
  }
}
