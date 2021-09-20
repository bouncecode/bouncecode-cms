/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Config.entities
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from 'typeorm';

/**
 * 변경된 내역에대한 로그입니다.
 */
@Entity()
@Index(['id', 'originId'])
export class ConfigLogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 변경된 레코드의 아이디입니다.
   */
  @Index()
  @Column()
  originId: string;

  @Column()
  isPublic: boolean;

  @Column({nullable: true})
  type?: string;

  @Column('json', {nullable: true})
  payload?: any;

  @Column()
  createdBy: number;

  @Column({nullable: true})
  updatedBy?: number;

  @Column({nullable: true})
  deletedBy?: number;

  @Column()
  createdDate: Date;

  @Column({nullable: true})
  updatedDate?: Date;

  @Column({nullable: true})
  deletedDate?: Date;
}
