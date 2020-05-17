/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Popup
 */

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

/**
 * 데이터베이스와 연결된 Entity 입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class PopupEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("json", { nullable: true })
  payload: object;
}
