import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('default')
export class SampleJobConsumer {

  @Process('message-job')
  async handle(job: Job<unknown>) {
    console.log(job.data);
  }
} 