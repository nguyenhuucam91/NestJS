import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Category } from "./category.model";

@Table({
  timestamps: false,
  tableName: 'posts'
})

export class Post extends Model { 
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Category)
  category_id: number;

  @Column
  short_content: string;

  @Column
  long_content: string;

  @BelongsTo(() => Category)
  category: Category
}