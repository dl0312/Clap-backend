import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn
} from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity()
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

  @ManyToOne(type => Comment, comment => comment.childrenComments, {
    onDelete: "SET NULL"
  })
  parentComment: Comment;

  @OneToMany(type => Comment, comment => comment.parentComment, {
    onDelete: "SET NULL"
  })
  @JoinColumn()
  childrenComments: Comment[];

  @Column({ type: "int" })
  level: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Comment;
