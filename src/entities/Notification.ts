import {
  BaseEntity,
  CreateDateColumn,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne
} from "typeorm";
import User from "./User";
import { notificationType } from "../types/types";
import Post from "./Post";
import Comment from "./Comment";

@Entity()
class Notification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(type => User)
  sender: User[];

  @ManyToOne(type => User, user => user.notificationsAsReceiver)
  receiver: User[];

  @Column({
    type: "text",
    enum: ["CLAP", "COMMENT", "FOLLOW", "NEWPOST", "CLAPHIT", "RECOMMENT"]
  })
  type: notificationType;

  @ManyToOne(type => Post)
  postOfFollowers: Post;

  @OneToOne(type => Comment)
  commentOnMyPost: Comment;

  @OneToOne(type => Comment)
  commentOnMyComment: Comment;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Notification;
