import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { PageEntity } from "./Page.entity";
import { PageObject } from "./Page.object";
import { PageCreateInput, PageUpdateInput, PageWhereInput } from "./inputs";
import { DeleteResultObject } from "../../commons/DeleteResult.object";

@Resolver()
export class PageResolver {
  @Query(() => PageObject)
  async page(@Arg("where") where: PageWhereInput) {
    return PageEntity.findOne({
      where,
    });
  }

  @Query(() => [PageObject])
  async pages(
    @Arg("where", { nullable: true }) where: PageWhereInput,
    @Arg("skip") skip: number,
    @Arg("take") take: number
  ) {
    return PageEntity.find({
      where,
      skip,
      take,
    });
  }

  @Mutation(() => PageObject)
  async createPage(@Arg("data") data: PageCreateInput) {
    return PageEntity.create(data).save();
  }

  @Mutation(() => PageObject)
  async updatePage(
    @Arg("where") where: PageWhereInput,
    @Arg("data") data: PageUpdateInput
  ) {
    return PageEntity.update(where, data);
  }

  @Mutation(() => DeleteResultObject)
  async deletePage(@Arg("where") where: PageWhereInput) {
    return PageEntity.delete(where);
  }
}
