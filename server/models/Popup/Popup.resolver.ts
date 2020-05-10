import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { PopupEntity } from "./Popup.entity";
import { PopupObject } from "./Popup.object";
import { PopupCreateInput, PopupUpdateInput, PopupWhereInput } from "./inputs";
import { DeleteResultObject } from "../../commons/DeleteResult.object";

@Resolver()
export class PopupResolver {
  @Query(() => PopupObject)
  async popup(@Arg("where") where: PopupWhereInput) {
    return PopupEntity.findOne({
      where,
    });
  }

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

  @Mutation(() => PopupObject)
  async createPopup(@Arg("data") data: PopupCreateInput) {
    return PopupEntity.create(data).save();
  }

  @Mutation(() => PopupObject)
  async updatePopup(
    @Arg("where") where: PopupWhereInput,
    @Arg("data") data: PopupUpdateInput
  ) {
    return PopupEntity.update(where, data);
  }

  @Mutation(() => DeleteResultObject)
  async deletePopup(@Arg("where") where: PopupWhereInput) {
    return PopupEntity.delete(where);
  }
}
