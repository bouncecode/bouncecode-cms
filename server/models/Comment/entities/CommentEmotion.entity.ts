/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
} from 'typeorm';

export enum CommentEmotionEnum {
  LIKE = 'like',
  UNLIKE = 'unlike',
}

/**
 * 사용자가 작성한 채팅 룸 내 메시지입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
@Unique(['commentId', 'userId'])
export class CommentEmotionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 댓글
  @Column()
  commentId: number;

  // 작성자
  @Column()
  userId: number;

  // 행동
  @Column({
    type: 'enum',
    enum: CommentEmotionEnum,
  })
  emotion: CommentEmotionEnum;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
