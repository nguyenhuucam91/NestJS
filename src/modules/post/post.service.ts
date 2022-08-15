import { Injectable } from '@nestjs/common';
import { Category } from 'src/models/category.model';
import { PostRepository } from 'src/repositories/post.repository';

@Injectable()
export class PostService {

  constructor(private postRepository: PostRepository) {}

  first()
  {
    return this.postRepository.findOne({include: Category});
  }

  create(data)
  {
    return this.postRepository.create(data)
  }
}
