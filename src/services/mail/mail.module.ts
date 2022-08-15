import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      return {
        transport: {
          host: 'smtp.mailtrap.io',
          secure: false,
          auth: {
            user: '99140a02cfe574',
            pass: '661643516028a9'
          },
        },
        defaults: {
          from: '"No Reply" <noreplay@example.com>'
        },
        template: {
          dir: join(__dirname, '/../../mails/templates'),
          adapter: new EjsAdapter(),
        }
      }
    },
  })],
})

export class MailModule { }