import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne
} from "typeorm";
import User from "./User";
import Post from "./Post";
import WikiImage from "./WikiImage";

@Entity()
class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  url: string;

  @Column()
  userId: number;

  @ManyToOne(type => User)
  user: User;

  @Column()
  postId: number;

  @ManyToOne(type => Post, { nullable: true })
  post: Post;

  @Column()
  wikiImageId: number;

  @OneToOne(type => WikiImage, { nullable: true })
  wikiImage: WikiImage;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Image;
