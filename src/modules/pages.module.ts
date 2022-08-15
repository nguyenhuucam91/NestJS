import { QueueExampleModule } from './queue-example/queue-example.module';
import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { MailExampleModule } from './mail-example/mail-example.module';

@Module({
  imports: [
    CategoryModule,
    QueueExampleModule,
    UsersModule,
    PostModule,
    MailExampleModule
  ],

  exports: [PagesModule]
})
export class PagesModule {}
