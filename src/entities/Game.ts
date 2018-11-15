import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import Category from "./Category";
import User from "./User";

@Entity()
class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text", nullable: true })
  icon: string;

  @Column({ type: "text", nullable: true })
  logo: string;

  @Column({ type: "text", nullable: true })
  officialSite: string;

  @OneToMany(type => Category, category => category.game)
  categories: Category[];

  @ManyToMany(type => User, user => user.games, { nullable: true })
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Game;
