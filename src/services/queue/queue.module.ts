import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => { 
        const queueDriver = configService.get('queue.default')
        return {
          [queueDriver]: {
            host: configService.get(`queue.${queueDriver}.host`),
            port: configService.get(`queue.${queueDriver}.port`)
          }
        }
      },
    }),
    BullModule.registerQueue({
      name: 'default'
    })
  ],

  exports: [BullModule]
})
export class QueueModule { }
