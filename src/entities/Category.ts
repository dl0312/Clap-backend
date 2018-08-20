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
}

export default Category;
