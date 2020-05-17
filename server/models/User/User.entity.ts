/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module server.models.User
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  DeleteDateColumn,
  VersionColumn,
} from "typeorm";
import { createHmac } from "crypto";

/**
 * 데이터베이스와 연결된 Entity 입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

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

  // start: hash password
  private tempPassword: string;
  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }
  @BeforeInsert()
  @BeforeUpdate()
  private encryptPassword(): void {
    if (this.tempPassword !== this.password) {
      this.password = createHmac("sha256", this.password).digest("hex");
    }
  }
  // end: hash password
}
