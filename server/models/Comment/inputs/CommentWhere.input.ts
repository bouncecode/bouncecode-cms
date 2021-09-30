import {UserUniqueWhereInput} from '../../User/inputs/UserUniqueWhere.input';
import {Field, InputType} from 'type-graphql';

@InputType()
export class CommentWhereInput {
  @Field({nullable: true})
  postId?: string;

  @Field({nullable: true})
  user?: UserUniqueWhereInput;
}
