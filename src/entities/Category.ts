import {
  BaseEntity,
  CreateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne
} from "typeorm";

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  name: string;

  @OneToOne(type => Category)
  parent: Category;

  @OneToOne(type => Category)
  child: Category;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Category;
