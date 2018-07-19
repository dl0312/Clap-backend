import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Clap from "./Clap";
import Comment from "./Comment";
import User from "./User";

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  body: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @OneToMany(type => Clap, clap => clap.post, { nullable: true })
  @JoinColumn()
  claps: Clap[];

  @OneToMany(type => Comment, comment => comment.post, { nullable: true })
  @JoinColumn()
  comments: Comment[];

  @Column({ type: "int", default: 0 })
  view: number;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Post;
