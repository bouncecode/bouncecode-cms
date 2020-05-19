/**
 * 관리자가 사이트를 설정합니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Config
 * @preferred
 */

import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { ConfigObject } from "../objects/Config.object";
import { ConfigWhereInput } from "../inputs/ConfigWhere.input";
import { ConfigUniqueWhereInput } from "../inputs/ConfigUniqueWhere.input";
import { ConfigUpsertInput } from "../inputs/ConfigUpsert.input";
import { ConfigEntity } from "../entities/Config.entity";
import { Context } from "../../../express";
import { ConfigLogEntity } from "../entities/ConfigLog.entity";
import { ConfigLogWhereInput } from "../inputs/ConfigLogWhere.input";
import { LessThanOrEqual } from "typeorm";
import { ConfigLogObject } from "../objects/ConfigLog.object";

/**
 * Config 와 관련된 요청을 처리합니다.
 *
 * @author BounceCode, Inc.
 */
@Resolver()
export class ConfigResolver {
  /**
   * Config 정보를 조회합니다.
   *
   * @author BounceCode, Inc.
   */
  @Query(() => ConfigObject)
  async config(@Arg("where") where: ConfigUniqueWhereInput) {
    return await ConfigEntity.findOne({ id: where.id, deletedBy: null });
  }

  /**
   * Config 목록을 조회합니다.
   *
   * @author BounceCode, Inc.
   */
  @Query(() => [ConfigObject])
  async configs(@Arg("where") where: ConfigWhereInput) {
    return await ConfigEntity.find({ ...where, deletedBy: null });
  }

  /**
   * Config 정보를 조회합니다.
   *
   * @author BounceCode, Inc.
   */
  @Query(() => [ConfigLogObject])
  async configLogs(
    @Arg("where") where: ConfigLogWhereInput,
    @Arg("before", { nullable: true }) before: number,
    @Arg("take") take: number
  ) {
    return await ConfigLogEntity.find({
      where: {
        ...where,
        ...(before ? { id: LessThanOrEqual(before) } : undefined),
      },
      order: { id: "DESC" },
      take,
    });
  }

  /**
   * Config 를 업데이트하거나 추가합니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => ConfigObject)
  async upsertConfig(
    @Arg("data") data: ConfigUpsertInput,
    @Ctx() ctx: Context
  ) {
    let entity = await ConfigEntity.findOne({ id: data.id });

    if (!entity) {
      entity = ConfigEntity.create(data);
      ConfigEntity.merge(entity, {
        createdBy: ctx.user.id,
      });
    } else if (entity.deletedBy) {
      ConfigEntity.merge(entity, data, {
        createdBy: ctx.user.id,
        updatedBy: null,
        deletedBy: null,
      });
    } else {
      ConfigEntity.merge(entity, data, {
        updatedBy: ctx.user.id,
        deletedBy: null,
      });
    }

    return await entity.save();
  }

  /**
   * Config 를 삭제합니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => Boolean)
  async deleteConfig(
    @Arg("where") where: ConfigUniqueWhereInput,
    @Ctx() ctx: Context
  ) {
    const entity = await ConfigEntity.findOne({ id: where.id });
    ConfigEntity.merge(entity, { deletedBy: ctx.user.id });
    return Boolean(await entity.save());
  }
}
