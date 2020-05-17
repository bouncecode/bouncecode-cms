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
} from "typeorm";

@Entity()
export class BoardItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  boardId: string;

  @Column("json", { nullable: true })
  payload: object;
}
