/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Board
 */

import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
export class BoardEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("json", { nullable: true })
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
