import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinTable
} from "typeorm";
import { gender } from "../types/types";
import Message from "./Message";
import Achievement from "./Achievement";
import Clap from "./Clap";
import Post from "./Post";
import Comment from "./Comment";
import Notification from "./Notification";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({
    type: "text",
    enum: ["MALE", "FEMALE"]
  })
  gender: gender;

  @Column({ type: "text", nullable: true })
  password: string;

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @OneToMany(type => Message, message => message.sender || message.receiver)
  messages: Message[];

  @Column({ type: "boolean", nullable: true })
  certification: boolean;

  @Column({ type: "int", default: 0 })
  exp: number;

  @Column({ type: "int", default: 0 })
  clapPoint: number;

  @ManyToMany(type => User, user => user.followers)
  @JoinTable()
  following: User[];

  @ManyToMany(type => User, user => user.following)
  followers: User[];

  @ManyToMany(type => Achievement, achievement => achievement.achievers)
  achievements: Achievement[];

  @OneToMany(type => Post, post => post.creator)
  posts: Post[];

  @OneToMany(type => Clap, clap => clap.sender)
  clapsAsSender: Clap[];

  @OneToMany(type => Clap, clap => clap.receiver)
  clapsAsReceiver: Clap[];

  @OneToMany(type => Comment, commnet => commnet.creator)
  comments: Comment[];

  @OneToMany(type => Notification, notification => notification.receiver)
  notificationsAsReceiver: Notification[];

  wikiImages;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default User;
