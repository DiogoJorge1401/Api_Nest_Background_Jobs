import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from '../create-user/CreateUserDTO';

@Processor('sendMail-queue')
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMailJob')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;
    await this.mailService.sendMail({
      to: data,
      from: {
        address: 'sue@mail.com',
        name: 'suegoid',
      },
      subject: 'Welcome to My World!',
      html: '<h1>GOD Suegoid</h1>',
    });
  }
  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`On Completed ${job.name}`);
  }
}
