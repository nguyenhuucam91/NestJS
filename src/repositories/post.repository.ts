import { Injectable } from "@nestjs/common";
import { Post } from "src/models/post.model";
import { BaseRepository } from "./base.repository";

@Injectable()
export class PostRepository extends BaseRepository
{ 
  constructor() 
  {
    super(Post)
  }
}