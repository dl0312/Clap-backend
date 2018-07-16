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

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "int" })
  senderId: number;

  @ManyToOne(type => User, user => user.messages)
  sender: User;

  @Column({ type: "int" })
  receiverId: number;

  @ManyToOne(type => User, user => user.messages)
  receiver: User;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Message;
