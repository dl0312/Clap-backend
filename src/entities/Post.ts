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
import WikiImage from "./WikiImage";
import PostImage from "./PostImage";
import Game from "./Game";

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text", nullable: true })
  titleImg: string;

  @Column({ nullable: true })
  titleImgPos: number;

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
    nullable: true
  })
  @JoinColumn()
  comments: Comment[];

  @RelationCount((post: Post) => post.comments)
  commentsCount: number;

  @Column({ type: "int", default: 0 })
  view: number;

  @ManyToMany(type => WikiImage, wikiImage => wikiImage.posts, {
    nullable: true
  })
  wikiImages: WikiImage[];

  @ManyToOne(type => Game)
  game: Game;

  @Column({ nullable: true })
  gameId: number;

  @Column("simple-array", { nullable: true })
  tags: string[];

  @OneToMany(type => PostImage, postImage => postImage.post)
  postImages: PostImage[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Post;
