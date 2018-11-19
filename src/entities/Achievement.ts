import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";

@Entity()
class Achievement extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  condition: string;

  @ManyToMany(type => User, user => user.achievements, { nullable: true })
  achievers: User[];

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Achievement;
