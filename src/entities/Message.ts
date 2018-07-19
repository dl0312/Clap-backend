import {
  BaseEntity,
  Column,
  CreateDateColumn,
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

  @Column() senderId: number;

  @ManyToOne(type => User, sender => sender.messagesAsSender)
  sender: User;

  @Column() receiverId: number;

  @ManyToOne(type => User, receiver => receiver.messagesAsReceiver)
  receiver: User;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Message;
