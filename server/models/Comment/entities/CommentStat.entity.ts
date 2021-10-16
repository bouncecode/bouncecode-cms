/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {
  Entity,
  Column,
  BaseEntity,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
} from 'typeorm';

/**
 * 사용자가 작성한 채팅 룸 내 메시지입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class CommentStatEntity extends BaseEntity {
  // 게시글
  @PrimaryColumn()
  postId: string;

  // 댓글 수
  @Column({default: 0})
  count: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
