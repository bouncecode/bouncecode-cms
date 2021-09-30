/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Test.objects
 */
import GraphQLJSON from 'graphql-type-json';
import {UserObject} from '../../User/objects/User.object';
import {ObjectType, Field} from 'type-graphql';

/**
 * {@link TestResolver} 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class ChatRoomObject {
  @Field()
  id: number;

  @Field()
  user: UserObject;

  @Field()
  room: ChatRoomObject;

  @Field()
  message: String;

  @Field(() => GraphQLJSON)
  payload: any;

  @Field()
  version: number;

  @Field()
  createdDate: Date;

  @Field()
  updatedDate: Date;
}
