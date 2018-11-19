import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import User from "./User";
import Post from "./Post";

@Entity()
class PostImage extends BaseEntity {
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

  @ManyToOne(type => Post, post => post.postImages)
  post: Post;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default PostImage;
