/**
 * Page 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Page
 * @preferred
 */

import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { PageEntity } from "./Page.entity";
import { PageObject } from "./objects/Page.object";
import { PageCreateInput } from "./inputs/PageCreate.input";
import { PageUpdateInput } from "./inputs/PageUpdate.input";
import { PageWhereInput } from "./inputs/PageWhere.input";
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
