import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Category from "./Category";
import Image from "./Image";

@Entity()
class Game extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  title: string;

  @OneToOne(type => Category)
  category: Category;

  @OneToOne(type => Image)
  logo: Image;

  @OneToOne(type => Image)
  icon: Image;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Game;
