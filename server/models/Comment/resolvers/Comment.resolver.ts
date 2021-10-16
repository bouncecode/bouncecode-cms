/**
 * 테스트를 위한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {Context} from '../../../express';
import {Resolver, Mutation, Query, Arg, Ctx, Int} from 'type-graphql';
import {getConnection, getRepository} from 'typeorm';
import {CommentObject} from '../objects/Comment.object';
import {CommentWhereInput} from '../inputs/CommentWhere.input';
import {CommentCreateInput} from '../inputs/CommentCreate.input';
import {CommentUniqueWhereInput} from '../inputs/CommentUniqueWhere.input';
import {CommentUpdateInput} from '../inputs/CommentUpdate.input';
import {CommentEntity} from '../entities/Comment.entity';
import {ApolloError} from 'apollo-server-express';
import {CommentStatEntity} from '../entities/CommentStat.entity';

@Resolver()
export class CommentResolver {
  @Query(() => [CommentObject])
  async comments(
    @Arg('where') where: CommentWhereInput,
    @Arg('skip', () => Int, {nullable: true}) skip: number = 0,
    @Arg('take', () => Int, {nullable: true}) take: number = 10,
  ) {
    try {
      const queryBuilder = getRepository(CommentEntity)
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user');

      if (where.postId) {
        queryBuilder.andWhere('comment.postId = :postId', {
          postId: where.postId,
        });
      }

      if (where.user?.id) {
        queryBuilder.andWhere('user.userId = :userId', {
          userId: where.user?.id,
        });
      } else if (where.user?.email) {
        queryBuilder.andWhere('user.userEmail = :userEmail', {
          userEmail: where.user?.email,
        });
      }

      const result = await queryBuilder
        .orderBy('comment.id', 'DESC')
        .offset(skip)
        .limit(take)
        .getMany();

      return result;
    } catch (e) {
      console.log(e);
      return new ApolloError(e);
    }
  }

  @Mutation(() => CommentObject)
  async commentCreate(
    @Arg('data') data: CommentCreateInput,
    @Ctx() ctx: Context,
  ) {
    try {
      const userId = ctx.user.id;
      const postId = data.postId;

      const raw = await getConnection().transaction(
        async transactionalEntityManager => {
          const queryBuilder = await transactionalEntityManager
            .createQueryBuilder()
            .insert()
            .into(CommentEntity)
            .values([{...data, user: {id: userId}}])
            .execute();

          await transactionalEntityManager
            .createQueryBuilder()
            .insert()
            .into(CommentStatEntity)
            .values([{postId, count: 1}])
            .onConflict(
              `("postId") DO UPDATE SET "count" = comment_stat_entity.count + 1`,
            )
            .execute();

          return queryBuilder.raw;
        },
      );

      return raw[0];
    } catch (e) {
      console.log(e);
      return new ApolloError(e);
    }
  }

  @Mutation(() => CommentObject)
  async commentUpdate(
    @Arg('where') where: CommentUniqueWhereInput,
    @Arg('data') data: CommentUpdateInput,
    @Ctx() ctx: Context,
  ) {
    try {
      const userId = ctx.user.id;

      const comment = await getRepository(CommentEntity)
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .getOne();

      if (comment.user.id !== userId) {
        throw new ApolloError('권한이 없습니다.');
      }

      const queryBuilder = await getConnection()
        .createQueryBuilder()
        .update(CommentEntity)
        .set(data)
        .where('id = :id', {id: where.id})
        .returning('*')
        .execute();

      const raw = queryBuilder.raw;

      return raw[0];
    } catch (e) {
      console.log(e);
      return new ApolloError(e);
    }
  }

  @Mutation(() => Number)
  async commentDelete(
    @Arg('where') where: CommentUniqueWhereInput,
    @Ctx() ctx: Context,
  ) {
    try {
      const userId = ctx.user.id;

      const comment = await getRepository(CommentEntity)
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .getOne();
      const postId = comment.postId;

      if (comment.user.id !== userId) {
        throw new ApolloError('권한이 없습니다.');
      }

      const affected = await getConnection().transaction(
        async transactionalEntityManager => {
          const queryBuilder = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(CommentEntity)
            .where('id = :id', {id: where.id})
            .execute();

          await transactionalEntityManager
            .createQueryBuilder()
            .update(CommentStatEntity)
            .set({
              count: () => 'count - 1',
            })
            .where('postId = :postId', {postId: postId})
            .execute();

          return queryBuilder.affected;
        },
      );

      return affected;
    } catch (e) {
      console.log(e);
      return new ApolloError(e);
    }
  }
}
