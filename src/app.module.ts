import { MailModule } from './services/mail/mail.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './services/database/database.module';
import { QueueModule } from './services/queue/queue.module';
import { PagesModule } from './modules/pages.module';
import { RuleModule } from './rules/rule.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path'
import queue from './config/queue';
import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [queue, database],
      isGlobal: true
    }),
    DatabaseModule,
    QueueModule,
    PagesModule,
    RuleModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n'),
        watch: true
      },
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang']
        },
        AcceptLanguageResolver
      ]
    }),
    MailModule
  ],
  controllers: [],
  providers: [
    
  ]
})
export class AppModule {}
