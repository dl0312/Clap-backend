import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { gender } from "../types/types";
import Achievement from "./Achievement";
import Clap from "./Clap";
import Comment from "./Comment";
import Message from "./Message";
import Notification from "./Notification";
import Post from "./Post";
import WikiImage from "./WikiImage";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({
    type: "text",
    enum: ["MALE", "FEMALE"],
    nullable: true
  })
  gender: gender;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @OneToMany(type => Message, message => message.sender)
  messagesAsSender: Message[];

  @OneToMany(type => Message, message => message.receiver)
  messagesAsReceiver: Message[];

  @Column({ type: "boolean", nullable: true })
  certification: boolean;

  @Column({ type: "int", default: 0 })
  exp: number;

  @Column({ type: "int", default: 0 })
  clapPoint: number;

  @ManyToMany(type => User, user => user.followers, { nullable: true })
  @JoinTable()
  following: User[];

  @ManyToMany(type => User, user => user.following, { nullable: true })
  @JoinTable()
  followers: User[];

  @ManyToMany(type => Achievement, achievement => achievement.achievers, {
    nullable: true
  })
  @JoinTable()
  achievements: Achievement[];

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @OneToMany(type => Clap, clap => clap.sender, { nullable: true })
  clapsAsSender: Clap[];

  @OneToMany(type => Clap, clap => clap.receiver, { nullable: true })
  clapsAsReceiver: Clap[];

  @OneToMany(type => Comment, commnet => commnet.user, { nullable: true })
  comments: Comment[];

  @OneToMany(type => Notification, notification => notification.receiver, {
    nullable: true
  })
  notificationsAsReceiver: Notification[];

  @OneToMany(type => WikiImage, wikiimage => wikiimage.user, { nullable: true })
  wikiImages: WikiImage[];

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
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
}

export default User;
