import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  TreeParent,
  TreeChildren,
  Tree
} from "typeorm";

@Entity()
@Tree("closure-table")
class Category extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  name: string;

  @TreeParent() parent: Category;

  @TreeChildren() children: Category[];

  // @TreeLevelColumn() level: number | null;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Category;
