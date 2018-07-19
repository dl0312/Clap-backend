import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity()
class Clap extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ nullable: true })
  senderId: number;

  @ManyToOne(type => User, user => user.clapsAsSender)
  sender: User;

  @Column({ nullable: true })
  receiverId: number;

  @ManyToOne(type => User, user => user.clapsAsReceiver)
  receiver: User;

  @ManyToOne(type => Post, post => post.claps)
  post: Post;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Clap;
