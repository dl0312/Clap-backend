import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany
} from "typeorm";
import Category from "./Category";
import Post from "./Post";

@Entity()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "int", nullable: true })
  count: number;

  @OneToOne(type => Category, { nullable: true })
  category: Category;

  @ManyToMany(type => Post, post => post.tags)
  posts: Post[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Tag;
