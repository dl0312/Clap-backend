import {
  BaseEntity,
  CreateDateColumn,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";
import Post from "./Post";

@Entity()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  body: string;

  @ManyToOne(type => User, user => user.comments)
  creator: User;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Comment;
