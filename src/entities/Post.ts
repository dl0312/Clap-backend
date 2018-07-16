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
import Clap from "./Clap";
import Comment from "./Comment";

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  body: string;

  @ManyToOne(type => User, user => user.posts)
  creator: User;

  @ManyToOne(type => Clap, clap => clap.post)
  claps: Clap[];

  @ManyToOne(type => Comment, comment => comment.post)
  comments: Comment[];

  @Column({ type: "int", default: 0 })
  view: number;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Post;
