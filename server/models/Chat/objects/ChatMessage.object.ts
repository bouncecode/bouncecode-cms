/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Test.objects
 */
import GraphQLJSON from 'graphql-type-json';
import {ObjectType, Field} from 'type-graphql';
import {ChatRoomObject} from './ChatRoom.object';

/**
 * {@link TestResolver} 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class ChatMessageObject {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  rooms: ChatRoomObject[];

  @Field(() => GraphQLJSON)
  payload: any;

  @Field()
  version: number;

  @Field()
  createdDate: Date;

  @Field()
  updatedDate: Date;
}
