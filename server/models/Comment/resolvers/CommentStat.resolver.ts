import {Resolver, Query, Arg} from 'type-graphql';
import {CommentStatEntity} from '../entities/CommentStat.entity';
import {CommentStatObject} from '../objects/CommentStat.object';
import {CommentStatUniqueWhereInput} from '../inputs/CommentStatUniqueWhere.input';
import {getRepository} from 'typeorm';
import {ApolloError} from 'apollo-server-express';

@Resolver()
export class CommentStatResolver {
  @Query(() => CommentStatObject, {nullable: true})
  async commentStat(@Arg('where') where: CommentStatUniqueWhereInput) {
    try {
      const result = await getRepository(CommentStatEntity)
        .createQueryBuilder('commentStat')
        .where('commentStat.postId = :postId', {
          postId: where.postId,
        })
        .getOne();

      return result;
    } catch (e) {
      console.log(e);
      return new ApolloError(e);
    }
  }
}
