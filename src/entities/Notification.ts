import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { notificationType } from "../types/types";
import Comment from "./Comment";
import Post from "./Post";
import User from "./User";

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
