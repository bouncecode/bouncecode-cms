import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class PageEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column("json", { nullable: true })
  payload: object;
}
