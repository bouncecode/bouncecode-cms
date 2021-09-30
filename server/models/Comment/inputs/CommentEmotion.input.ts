import GraphQLJSON from 'graphql-type-json';
import {Field, InputType, registerEnumType} from 'type-graphql';
import {CommentEmotionEnum} from '../entities/CommentEmotion.entity';

registerEnumType(CommentEmotionEnum, {
  name: 'CommentEmotionEnum',
});

@InputType()
export class CommentEmotionInput {
  @Field(() => CommentEmotionEnum)
  emotion: CommentEmotionEnum;
}
