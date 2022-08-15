import { QueueExampleService } from './queue-example.service';
import { Controller, Get } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('queue-example')
export class QueueExampleController {
  
  constructor(private queueExampleService: QueueExampleService) { }

  @Get()
  async index()
  {
    await this.queueExampleService.addToQueue({foo: "bar"})
  }

}
