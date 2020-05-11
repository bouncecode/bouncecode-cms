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
} from "typeorm";
import { createHmac } from "crypto";

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

  @Column("json", { nullable: true })
  payload?: object;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

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
