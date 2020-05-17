/**
 * Popup 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Popup
 * @preferred
 */

import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { PopupEntity } from "./Popup.entity";
import { PopupObject } from "./objects/Popup.object";
import { PopupCreateInput } from "./inputs/PopupCreate.input";
import { PopupUpdateInput } from "./inputs/PopupUpdate.input";
import { PopupWhereInput } from "./inputs/PopupWhere.input";
import { DeleteResultObject } from "../../commons/DeleteResult.object";

/**
 * Popup 에 관련된 요청을 처리합니다.
 *
 * @author BounceCode, Inc.
 */
@Resolver()
export class PopupResolver {
  /**
   * popup 데이터를 가져옵니다.
   *
   * @author BounceCode, Inc.
   */
  @Query(() => PopupObject)
  async popup(@Arg("where") where: PopupWhereInput) {
    return PopupEntity.findOne({
      where,
    });
  }

  /**
   * popup 데이터 목록을 가져옵니다.
   *
   * @author BounceCode, Inc.
   */
  @Query(() => [PopupObject])
  async popups(
    @Arg("where", { nullable: true }) where: PopupWhereInput,
    @Arg("skip") skip: number,
    @Arg("take") take: number
  ) {
    return PopupEntity.find({
      where,
      skip,
      take,
    });
  }

  /**
   * popup 데이터를 만듭니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => PopupObject)
  async createPopup(@Arg("data") data: PopupCreateInput) {
    return PopupEntity.create(data).save();
  }

  /**
   * popup 데이터를 수정합니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => PopupObject)
  async updatePopup(
    @Arg("where") where: PopupWhereInput,
    @Arg("data") data: PopupUpdateInput
  ) {
    return PopupEntity.update(where, data);
  }

  /**
   * popup 데이터를 삭제합니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => DeleteResultObject)
  async deletePopup(@Arg("where") where: PopupWhereInput) {
    return PopupEntity.delete(where);
  }
}
