/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.BoardItem
 */

import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class BoardItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  boardId: string;

  @Column("simple-json", { nullable: true })
  payload?: any;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @VersionColumn()
  version: number;
}
