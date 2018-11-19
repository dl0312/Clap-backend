import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column
} from "typeorm";
import User from "./User";
import Product from "./Product";

@Entity()
class Exchange extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ nullable: true })
  buyerId: number;

  @ManyToOne(type => User, user => user.exchanges)
  buyer: User;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(type => Product, product => product.exchanges)
  product: Product;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}

export default Exchange;
