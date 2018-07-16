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
import Post from "./Post";

@Entity()
class Clap extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "int" })
  senderId: number;

  @ManyToOne(type => User, user => user.clapsAsSender)
  sender: User;

  @Column({ type: "int" })
  receiverId: number;

  @ManyToOne(type => User, user => user.clapsAsReceiver)
  receiver: User;

  @ManyToOne(type => Post, post => post.claps)
  post: Post;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Clap;
