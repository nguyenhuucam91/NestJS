import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';
import { Category }  from 'src/models/category.model';
import { CategoryRepository } from '../../repositories/category.repository';
import { PostModule } from '../post/post.module';
import { PostRepository } from 'src/repositories/post.repository';
import { Post } from 'src/models/post.model';

@Module({
  imports: [SequelizeModule.forFeature([Category, Post]), PostModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, PostRepository],
})
export class CategoryModule {}
