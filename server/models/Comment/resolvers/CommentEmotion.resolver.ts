import {Context} from '../../../express';
import {Resolver, Mutation, Query, Arg, Ctx, Int} from 'type-graphql';
import {getConnection, getRepository} from 'typeorm';
import {CommentObject} from '../objects/Comment.object';
import {CommentUniqueWhereInput} from '../inputs/CommentUniqueWhere.input';
import {CommentEntity} from '../entities/Comment.entity';
import {CommentEmotionInput} from '../inputs/CommentEmotion.input';
import {CommentEmotionEntity} from '../entities/CommentEmotion.entity';
import {ApolloError} from 'apollo-server-express';
import {CommentEmotionObject} from '../objects/CommentEmotion.object';

@Resolver()
export class CommentEmotionResolver {
  @Query(() => CommentEmotionObject, {nullable: true})
  async commentMyEmotion(
    @Arg('where') where: CommentUniqueWhereInput,
    @Ctx() ctx: Context,
  ) {
    try {
      const userId = ctx.user.id;
      const commentId = where.id;

      const commentEmotion = await getRepository(CommentEmotionEntity)
        .createQueryBuilder('commentEmotion')
        .where('commentEmotion.userId = :userId', {userId})
        .andWhere('commentEmotion.commentId = :commentId', {commentId})
        .getOne();

      return commentEmotion;
    } catch (e) {
      console.log(e);
      return new ApolloError(e);
    }
  }

  @Mutation(() => CommentObject)
  async commentEmotion(
    @Arg('where') where: CommentUniqueWhereInput,
    @Arg('data') data: CommentEmotionInput,
    @Ctx() ctx: Context,
  ) {
    try {
      const userId = ctx.user.id;
      const commentId = where.id;
      const emotion = data.emotion;

      const commentEmotion = await getRepository(CommentEmotionEntity)
        .createQueryBuilder('commentEmotion')
        .where('commentEmotion.userId = :userId', {userId})
        .andWhere('commentEmotion.commentId = :commentId', {commentId})
        .getOne();
      const oldEmotion = commentEmotion?.emotion;

      const raw = await getConnection().transaction(
        async transactionalEntityManager => {
          if (commentEmotion) {
            await transactionalEntityManager
              .createQueryBuilder()
              .update(CommentEntity)
              .set({
                [oldEmotion]: () => `comment_entity.${oldEmotion} - 1`,
              })
              .where('id = :commentId', {commentId})
              .execute();
          }

          const queryBuilder = await transactionalEntityManager
            .createQueryBuilder()
            .update(CommentEntity)
            .set({
              [emotion]: () => `comment_entity.${emotion} + 1`,
            })
            .where('id = :commentId', {commentId})
            .returning('*')
            .execute();

          await transactionalEntityManager
            .createQueryBuilder()
            .insert()
            .into(CommentEmotionEntity)
            .values([{commentId, userId, emotion}])
            .onConflict(
              `("commentId", "userId") DO UPDATE SET "emotion" = :emotion`,
            )
            .setParameters({emotion})
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
  async commentEmotionUndo(
    @Arg('where') where: CommentUniqueWhereInput,
    @Ctx() ctx: Context,
  ) {
    try {
      const userId = ctx.user.id;
      const commentId = where.id;

      const commentEmotion = await getRepository(CommentEmotionEntity)
        .createQueryBuilder('commentEmotion')
        .where('commentEmotion.userId = :userId', {userId})
        .andWhere('commentEmotion.commentId = :commentId', {commentId})
        .getOne();
      const oldEmotion = commentEmotion?.emotion;
      if (!commentEmotion) {
        return new ApolloError('선택된 감정이 없습니다.');
      }

      const raw = await getConnection().transaction(
        async transactionalEntityManager => {
          const queryBuilder = await transactionalEntityManager
            .createQueryBuilder()
            .update(CommentEntity)
            .set({
              [oldEmotion]: () => `comment_entity.${oldEmotion} - 1`,
            })
            .where('id = :commentId', {commentId})
            .returning('*')
            .execute();

          await transactionalEntityManager
            .createQueryBuilder()
            .delete()
            .from(CommentEmotionEntity)
            .where('commentId = :commentId', {commentId})
            .andWhere('userId = :userId', {userId})
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
}
