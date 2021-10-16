/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  DeleteDateColumn,
  VersionColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import bcrypt from 'bcrypt';
import {ChatMessageEntity} from '../../Chat/entities/ChatMessage.entity';
import {ChatRoomEntity} from '../../Chat/entities/ChatRoom.entity';

/**
 * 데이터베이스와 연결된 Entity 입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Column({nullable: true})
  password: string;

  @Column({nullable: true})
  passwordEncrypted?: string;

  @Column({default: false})
  isAdmin: boolean;

  @Column('json', {nullable: true})
  payload?: any;

  @ManyToMany(
    () => ChatRoomEntity,
    chatRoom => chatRoom.attendees,
  )
  chatRooms: ChatRoomEntity[];

  @OneToMany(
    () => ChatMessageEntity,
    chatMessage => chatMessage.user,
  )
  chatMessages: ChatMessageEntity[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @VersionColumn()
  version: number;

  @BeforeInsert()
  @BeforeUpdate()
  private async encryptPassword(): Promise<void> {
    if (this.password) {
      this.passwordEncrypted = await bcrypt.hash(this.password, 10);
      this.password = undefined;
    }
  }
}
