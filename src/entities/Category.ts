import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  TreeChildren,
  TreeParent,
  Tree,
  ManyToOne
} from "typeorm";
import WikiImage from "./WikiImage";
import Game from "./Game";

@Entity()
@Tree("closure-table")
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @ManyToOne(type => Game, game => game.categories, { nullable: true })
  game: Game;

  @TreeParent()
  parent: Category;

  @TreeChildren({ cascade: true })
  children: Category[];

  @Column({ nullable: true, default: 0 })
  length: number;

  @OneToMany(type => WikiImage, wikiImage => wikiImage.category)
  wikiImages: WikiImage[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  get topWikiImage(): WikiImage {
    let topWikiImage: WikiImage = this.wikiImages[0];
    for (const wikiImage of this.wikiImages) {
      if (topWikiImage.clapsCount < wikiImage.clapsCount) {
        topWikiImage = wikiImage;
      } else if (topWikiImage.clapsCount === wikiImage.clapsCount) {
        if (topWikiImage.updatedAt < wikiImage.updatedAt) {
          topWikiImage = wikiImage;
        }
      }
    }
    return topWikiImage;
  }
}

export default Category;
