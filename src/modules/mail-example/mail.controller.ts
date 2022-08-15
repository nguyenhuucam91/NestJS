import { MailerService } from "@nestjs-modules/mailer";
import { Controller, Get } from "@nestjs/common";

@Controller('mail')
export class MailController { 
  constructor(private readonly mailerService: MailerService) { }

  @Get('test')
  test() {
    this.mailerService
      .sendMail({
        to: 'test@nestjs.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        template: 'welcome',
        context: {
          user: 'camnh'
        }
      })
      .then(() => { console.log ('succeed') })
      .catch((e) => {console.log(e)});
  }
}