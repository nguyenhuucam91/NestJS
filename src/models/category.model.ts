import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import {Post} from "./post.model";

@Table({
  timestamps: false,
  tableName: 'categories'
})
export class Category extends Model { 
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @HasMany(() => Post)
  posts: Post[]
}