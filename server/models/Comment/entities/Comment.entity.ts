/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {UserEntity} from '../../User/entities/User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  VersionColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

/**
 * 사용자가 작성한 채팅 룸 내 메시지입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 게시글
  @Column()
  @Index()
  postId: string;

  // 대댓글
  @Column({nullable: true})
  parentId: number;

  // 내용
  @Column()
  text: string;

  @Column('json')
  payload: any;

  // 작성자
  @ManyToOne(
    () => UserEntity,
    user => user.chatMessages,
  )
  user: UserEntity;

  // 좋아요
  @Column({default: 0})
  like: number;

  // 싫어요
  @Column({default: 0})
  unlike: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
