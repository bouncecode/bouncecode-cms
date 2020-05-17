/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Menu
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
export class MenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: true })
  parentId?: number;

  @Column()
  index: number;

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
