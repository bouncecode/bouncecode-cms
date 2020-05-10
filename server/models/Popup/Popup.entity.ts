import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class PopupEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("json", { nullable: true })
  payload: object;
}
