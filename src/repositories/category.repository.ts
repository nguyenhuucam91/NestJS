import { Injectable } from "@nestjs/common";
import { Category } from "src/models/category.model";
import { BaseRepository } from "./base.repository";

@Injectable()
export class CategoryRepository extends BaseRepository
{
  constructor() {
    super(Category)
  }
}