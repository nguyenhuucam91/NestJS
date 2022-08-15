import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TestMiddleware } from './middlewares/test.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes({
      path: 'users/:username',
      method: RequestMethod.GET
    })
  }
  
}
