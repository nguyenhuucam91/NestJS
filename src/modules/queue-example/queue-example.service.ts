import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueExampleService {

  constructor(@InjectQueue('default') private defaultQueue: Queue) { }

  async addToQueue(data) { 
      await this.defaultQueue.add('message-job', data)
  }
}
