import { Model } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';
import { CreateOptions, ModelStatic, UpdateOptions } from 'sequelize';

@Injectable()
export abstract class BaseRepository
{
  constructor(private modelEntity: ModelStatic<Model>) { }
  
  async findOne(where) { 
    return this.modelEntity.findOne({where})
  }

  async findAll(options) {
    return this.modelEntity.findAll(options)
  }

  async create(data, options?: CreateOptions<any>)
  {
    return this.modelEntity.create(data, options)
  }

  async update(value, where, options?: UpdateOptions<any>) { 
    return this.modelEntity.update(value, {where: where, ...options})
  }
}