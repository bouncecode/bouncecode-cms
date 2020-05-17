/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Board
 */

import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class BoardEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("json", { nullable: true })
  payload: object;
}
