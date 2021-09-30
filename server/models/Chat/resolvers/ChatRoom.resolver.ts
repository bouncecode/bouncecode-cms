/**
 * 테스트를 위한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Test.resolvers
 * @preferred
 */

import {Context} from '../../../express';
import {Resolver, Mutation, Query, Arg, Ctx} from 'type-graphql';
import {getConnection, getRepository} from 'typeorm';
import {ChatRoomWhereInput} from '../inputs/ChatRoomWhere.input';
import {ChatRoomObject} from '../objects/ChatRoom.object';
import {UserEntity} from '../../User/entities/User.entity';
import {ChatRoomUniqueWhereInput} from '../inputs/ChatRoomUniqueWhere.input';
import {ChatRoomEntity} from '../entities/ChatRoom.entity';
import {ChatRoomUpdateInput} from '../inputs/ChatRoomUpdate.input';
import {ChatRoomCreateInput} from '../inputs/ChatRoomCreate.input';

@Resolver()
export class ChatRoomResolver {
  @Query(() => [ChatRoomObject])
  async chatRooms(
    @Arg('where') where: ChatRoomWhereInput,
    @Arg('skip', {nullable: true}) skip: number = 0,
    @Arg('take', {nullable: true}) take: number = 10,
    @Ctx() ctx: Context,
  ) {
    const userId = ctx.user.id;

    const queryBuilder = getRepository(UserEntity)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.chatRooms', 'chatRooms')
      .andWhere('user.id = :userId', {
        userId: userId,
      });

    if (where.category) {
      queryBuilder
        .leftJoinAndSelect('chatRooms.category', 'category')
        .andWhere('category.id = :categoryId', {
          categoryId: where.category,
        });
    }

    const result = await queryBuilder
      .offset(skip)
      .limit(take)
      .getMany();

    console.log(result);

    return result;
  }

  @Mutation(() => Boolean)
  async createChatRoom(@Arg('data') data: ChatRoomCreateInput) {
    const queryBuilder = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(ChatRoomEntity)
      .values([data])
      .execute();

    console.log(queryBuilder);

    return true;
  }

  @Mutation(() => Boolean)
  async updateChatRoom(
    @Arg('where') where: ChatRoomUniqueWhereInput,
    @Arg('data') data: ChatRoomUpdateInput,
  ) {
    const queryBuilder = await getConnection()
      .createQueryBuilder()
      .update(ChatRoomEntity)
      .set(data)
      .where('id = :id', {id: where.id})
      .execute();

    console.log(queryBuilder);

    return true;
  }

  @Mutation(() => Boolean)
  async deleteChatRoom(@Arg('where') where: ChatRoomUniqueWhereInput) {
    const queryBuilder = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ChatRoomEntity)
      .where('id = :id', {id: where.id})
      .execute();

    console.log(queryBuilder);

    return true;
  }
}
