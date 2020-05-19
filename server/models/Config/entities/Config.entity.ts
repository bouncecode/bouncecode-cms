/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.Config.entities
 */

import {
  Entity,
  Column,
  BaseEntity,
  AfterInsert,
  AfterUpdate,
  BeforeUpdate,
  BeforeInsert,
  PrimaryColumn,
  Index,
} from "typeorm";
import { ConfigLogEntity } from "./ConfigLog.entity";

/**
 * 공개된 데이터를 저장합니다.
 */
@Entity()
@Index(["type", "isPublic"])
export class ConfigEntity extends BaseEntity {
  /**
   * 고유값입니다.
   */
  @PrimaryColumn()
  id: string;

  /**
   * 커스텀 타입을 설정할 수 있습니다.
   */
  @Index()
  @Column({ nullable: true })
  type?: string;

  /**
   * false 인 경우 관리자만 조회할 수 있습니다.
   */
  @Column()
  isPublic: boolean;

  /**
   * 관련된 모든 데이터
   */
  @Column("json", { nullable: true })
  payload?: any;

  /**
   * 만든 사람의 아이디
   */
  @Column()
  createdBy: number;

  /**
   * 수정한 사람의 아이디
   */
  @Column({ nullable: true })
  updatedBy?: number;

  /**
   * 삭제한 User 의 아이디
   */
  @Column({ nullable: true })
  deletedBy?: number;

  /**
   * 만든 날짜. 이 필드는 자동으로 업데이트됩니다.
   */
  @Column()
  createdDate: Date;

  /**
   * 수정한 날짜. 이 필드는 자동으로 업데이트됩니다.
   */
  @Column({ nullable: true })
  updatedDate?: Date;

  /**
   * 삭제한 날짜. 이 필드는 deletedBy 를 설정하면 자동으로 업데이트됩니다.
   */
  @Column({ nullable: true })
  deletedDate?: Date;

  /**
   * Insert 하기 전에 createdDate 를 설정합니다.
   */
  @BeforeInsert()
  private handleBeforeInsert() {
    this.createdDate = new Date();
  }

  /**
   * Update 하기 전에 updatedDate 를 설정합니다.
   */
  @BeforeUpdate()
  private handleBeforeUpdate() {
    if (this.deletedBy) {
      this.deletedDate = new Date();
    } else {
      this.updatedDate = new Date();
      this.deletedDate = null;
    }
  }

  /**
   * 레코드가 수정된 경우 로그를 기록합니다.
   */
  @AfterInsert()
  @AfterUpdate()
  private async handleAfterInsertOrUpdate() {
    const siteLogEntity = new ConfigLogEntity();

    ConfigLogEntity.merge(siteLogEntity, {
      ...this,
      id: undefined,
      originId: this.id,
    });

    return await ConfigLogEntity.insert(siteLogEntity);
  }
}
