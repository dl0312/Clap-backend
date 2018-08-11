import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  TreeParent,
  TreeChildren,
  Tree,
  OneToMany
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
  parent: Category[];

  @TreeChildren()
  children: Category[];

  @OneToMany(type => WikiImage, wikiImage => wikiImage.category)
  wikiImages: WikiImage[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Category;
