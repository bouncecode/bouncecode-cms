/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Chat.entities
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  Column,
  OneToMany,
} from 'typeorm';
import {ChatRoomEntity} from './ChatRoom.entity';

/**
 * 관리자가 지정하는 채팅 룸의 종류입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class ChatCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(
    () => ChatRoomEntity,
    room => room.category,
    {cascade: false, onDelete: 'SET NULL'},
  )
  rooms: ChatRoomEntity[];

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
