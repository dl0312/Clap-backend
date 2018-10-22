import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import WikiImage from "./WikiImage";

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @ManyToMany(type => Category, category => category.children, {
    nullable: true
  })
  @JoinTable()
  parent: Category[];

  @ManyToMany(type => Category, category => category.parent, {
    nullable: true
  })
  children: Category[];

  @OneToMany(type => WikiImage, wikiImage => wikiImage.category)
  wikiImages: WikiImage[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  async topWikiImage(): Promise<WikiImage> {
    const wikiImages = await WikiImage.find({ categoryId: this.id });
    let topWikiImage: WikiImage = wikiImages[0];
    for (const wikiImage of wikiImages) {
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
