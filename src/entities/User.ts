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
  UpdateDateColumn,
  RelationCount
} from "typeorm";
import { gender } from "../types/types";
import Achievement from "./Achievement";
import Clap from "./Clap";
import Comment from "./Comment";
import Message from "./Message";
import Notification from "./Notification";
import Post from "./Post";
import WikiImage from "./WikiImage";
import Exchange from "./Exchange";

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

  @Column({ type: "text", nullable: true })
  profilePhoto: string;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @OneToMany(type => Message, message => message.sender, { nullable: true })
  messagesAsSender: Message[];

  @OneToMany(type => Message, message => message.receiver, { nullable: true })
  messagesAsReceiver: Message[];

  @Column({ type: "boolean", nullable: true })
  certification: boolean;

  @Column({ type: "int", default: 0 })
  exp: number;

  @ManyToMany(type => Achievement, achievement => achievement.achievers, {
    nullable: true
  })
  @JoinTable()
  achievements: Achievement[];

  @ManyToMany(type => User, user => user.followers, { nullable: true })
  following: User[];

  @ManyToMany(type => User, user => user.following, { nullable: true })
  @JoinTable()
  followers: User[];

  @RelationCount((user: User) => user.followers)
  followersCount: number;

  @RelationCount((user: User) => user.following)
  followingCount: number;

  @OneToMany(type => Post, post => post.user, { nullable: true })
  posts: Post[];

  @OneToMany(type => Exchange, exchange => exchange.buyer, { nullable: true })
  exchanges: Exchange[];

  @OneToMany(type => Clap, clap => clap.sender, { nullable: true })
  clapsAsSender: Clap[];

  @OneToMany(type => Clap, clap => clap.receiver, { nullable: true })
  clapsAsReceiver: Clap[];

  @RelationCount((user: User) => user.clapsAsReceiver)
  clapsAsReceiverCount: number;

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

  get clapPoint(): number {
    return this.clapsAsReceiverCount;
  }

  // Promise<number> ? number error need to fix
  // async clapPoint(): Promise<number> {
  //   let spend = 0;
  //   const user = await User.findOne(
  //     { id: this.id },
  //     { relations: ["exchanges", "exchanges.product"] }
  //   );
  //   console.log();
  //   if (user) {
  //     user.exchanges.forEach(exchange => {
  //       spend += exchange.product.price;
  //     });
  //   }
  //   const point = this.clapsAsReceiverCount - spend;
  //   return point;
  // }

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
