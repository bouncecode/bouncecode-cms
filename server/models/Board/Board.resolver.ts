import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { BoardEntity } from "./Board.entity";
import { BoardObject } from "./Board.object";
import { BoardWhereInput, BoardCreateInput, BoardUpdateInput } from "./inputs";
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
