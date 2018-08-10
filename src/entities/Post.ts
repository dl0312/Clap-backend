import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  RelationCount,
  ManyToMany
} from "typeorm";
import Clap from "./Clap";
import Comment from "./Comment";
import User from "./User";
import Category from "./Category";
import WikiImage from "./WikiImage";

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text", nullable: true })
  color: string;

  @Column({ type: "text", nullable: true })
  font: string;

  @Column({ type: "int", nullable: true })
  contentWidth: number;

  @Column({ type: "text", nullable: true })
  body: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @OneToMany(type => Clap, clap => clap.post, { nullable: true })
  @JoinColumn()
  claps: Clap[];

  @RelationCount((post: Post) => post.claps)
  clapsCount: number;

  @OneToMany(type => Comment, comment => comment.post, {
    nullable: true,
    cascade: true
  })
  @JoinColumn()
  comments: Comment[];

  @RelationCount((post: Post) => post.comments)
  commentsCount: number;

  @ManyToOne(type => Category)
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @Column({ type: "int", default: 0 })
  view: number;

  @ManyToMany(type => WikiImage, wikiImage => wikiImage.posts, {
    nullable: true
  })
  wikiImages: WikiImage[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Post;
