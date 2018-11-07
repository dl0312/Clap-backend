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
  Tree
} from "typeorm";
import WikiImage from "./WikiImage";

@Entity()
@Tree("closure-table")
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @TreeParent()
  parent: Category;

  @TreeChildren({ cascade: true })
  children: Category[];

  @Column({ nullable: true, default: 0 })
  length: number;

  // console.log(
  //   JSON.stringify(
  //     getConnection()
  //       .getRepository(Category)
  //       .manager.getTreeRepository(Category)
  //       .findRoots()
  //   )
  // );

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
