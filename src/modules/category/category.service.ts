import { Injectable } from "@nestjs/common";
import { Post } from 'src/models/post.model';
import { CategoryRepository } from "src/repositories/category.repository";
import { PostRepository } from "src/repositories/post.repository";

@Injectable()
export class CategoryService { 

  constructor(
    private categoryRepository: CategoryRepository,
    private postRepository: PostRepository
  ) { }

  async all() {
    return this.categoryRepository.findAll({include: [Post]})
  }

  async findOne(where) {
    return this.categoryRepository.findOne({where});
  }

  async create(data) { 
    return this.categoryRepository.create(data);
  }

  async update(data, id) { 
    return this.categoryRepository.update(data, {id})
  }

  async createTransaction(transaction) {
    const category = await this.categoryRepository.create({
        name: 'sample test',
        description: 'sample desc'
    }, { transaction })
    
    await this.postRepository.create({
      short_content: '12332112332112313123123',
      long_content: 'alksjdokadhasod',
      category_id: category.id
    }, {transaction})
  }
}