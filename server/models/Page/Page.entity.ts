/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Page
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
export class PageEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

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
