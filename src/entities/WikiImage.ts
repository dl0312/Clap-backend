import {
  BaseEntity,
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  RelationCount,
  ManyToMany,
  JoinTable
} from "typeorm";
import User from "./User";
import Category from "./Category";
import Image from "./Image";
import Clap from "./Clap";
import Post from "./Post";

@Entity()
class WikiImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.comments)
  user: User;

  @ManyToOne(type => Category, category => category.wikiImages)
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(type => Image)
  shownImage: Image;

  @Column({ type: "text" })
  hoverImage: string;

  @OneToMany(type => Clap, clap => clap.wikiImage, { nullable: true })
  @JoinColumn()
  claps: Clap[];

  @RelationCount((wikiImage: WikiImage) => wikiImage.claps)
  clapsCount: number;

  @ManyToMany(type => Post, post => post.wikiImages, { nullable: true })
  @JoinTable()
  posts: Post[];

  @RelationCount((wikiImage: WikiImage) => wikiImage.posts)
  postsCount: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default WikiImage;
