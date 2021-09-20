/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Config.inputs
 */

import {Field, InputType} from 'type-graphql';
import GraphQLJSON from 'graphql-type-json';

/**
 * {@link ConfigResolver} 에서 입력된 데이터를 확인하기위한 InputType 입니다.
 *
 * @author BounceCode, Inc.
 */
@InputType()
export class ConfigUpsertInput {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  isPublic: boolean;

  @Field(() => GraphQLJSON, {nullable: true})
  payload?: any;
}
