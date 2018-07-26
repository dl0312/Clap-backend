import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import Category from "./Category";
import Exchange from "./Exchange";

@Entity()
class Product extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "int" })
  price: number;

  @Column({ type: "int", default: 100 })
  stock: number;

  @OneToMany(type => Exchange, exchange => exchange.product)
  exchanges: Exchange[];

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(type => Category)
  category: Category;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Product;
