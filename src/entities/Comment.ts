import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  TreeParent,
  TreeChildren,
  Tree
} from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity()
@Tree("closure-table")
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  body: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;

  @TreeParent()
  parentComment: Comment;

  @TreeChildren()
  childrenComments: Comment[];

  @Column({ type: "int" })
  level: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Comment;
