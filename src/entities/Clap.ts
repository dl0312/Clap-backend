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
import WikiImage from "./WikiImage";

@Entity()
class Clap extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  senderId: number;

  @ManyToOne(type => User, user => user.clapsAsSender)
  sender: User;

  @Column({ nullable: true })
  receiverId: number;

  @ManyToOne(type => User, user => user.clapsAsReceiver)
  receiver: User;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(type => Post, post => post.claps, { nullable: true })
  post: Post;

  @Column({ nullable: true })
  wikiImageId: number;

  @ManyToOne(type => WikiImage, wikiImage => wikiImage.claps, {
    nullable: true
  })
  wikiImage: WikiImage;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Clap;
