/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Chat.entities
 */

import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  ManyToMany,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  RelationId,
  JoinTable,
} from 'typeorm';
import {UserEntity} from '../../User/entities/User.entity';
import {ChatCategoryEntity} from './ChatCategory.entity';
import {ChatMessageEntity} from './ChatMessage.entity';

/**
 * 사용자가 생성한 채팅 룸입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class ChatRoomEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(
    () => ChatCategoryEntity,
    category => category.rooms,
    {nullable: true},
  )
  category?: ChatCategoryEntity;

  @RelationId((entity: ChatRoomEntity) => entity.category)
  categoryId: number;

  @ManyToMany(
    () => UserEntity,
    user => user.chatRooms,
  )
  @JoinTable()
  attendees: UserEntity[];

  @OneToOne(
    type => ChatMessageEntity,
    message => message.lastMessage,
  )
  @JoinColumn()
  lastMessage: ChatMessageEntity;

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
