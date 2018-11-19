import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne
} from "typeorm";
import User from "./User";
import WikiImage from "./WikiImage";

@Entity()
class ShownImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  url: string;

  @Column()
  userId: number;

  @ManyToOne(type => User)
  user: User;

  @Column({ nullable: true })
  wikiImageId: number;

  @OneToOne(type => WikiImage, wikiImage => wikiImage.shownImage)
  wikiImage: WikiImage;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default ShownImage;
