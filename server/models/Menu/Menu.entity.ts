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

  @Column("json")
  payload: object;
}
