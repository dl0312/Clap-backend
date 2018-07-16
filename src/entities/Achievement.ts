import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  ManyToMany
} from "typeorm";
import User from "./User";

@Entity()
class Achievement extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  condition: string;

  @ManyToMany(type => User, user => user.achievements)
  achievers: User[];

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Achievement;
