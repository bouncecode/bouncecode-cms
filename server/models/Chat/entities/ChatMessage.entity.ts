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
  OneToOne,
  RelationId,
} from 'typeorm';
import {ChatRoomEntity} from './ChatRoom.entity';

/**
 * 사용자가 작성한 채팅 룸 내 메시지입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class ChatMessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  roomId: string;

  @ManyToOne(
    () => UserEntity,
    user => user.chatMessages,
  )
  user: UserEntity;

  @RelationId((entity: ChatMessageEntity) => entity.user)
  userId: number;

  @OneToOne(
    type => ChatRoomEntity,
    room => room.lastMessage,
  )
  lastMessage: ChatRoomEntity;

  @Column()
  message: string;

  @Column('json')
  payload: any;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
