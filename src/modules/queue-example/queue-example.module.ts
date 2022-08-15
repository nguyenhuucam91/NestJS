import { Module } from '@nestjs/common';
import { QueueModule } from 'src/services/queue/queue.module';
import { SampleJobConsumer } from './jobs/sample-job.consumer';
import { QueueExampleController } from './queue-example.controller';
import { QueueExampleService } from './queue-example.service';

@Module({
  imports: [QueueModule],
  controllers: [QueueExampleController],
  providers: [QueueExampleService, SampleJobConsumer],
})
export class QueueExampleModule {}
