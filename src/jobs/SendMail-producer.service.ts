import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDTO } from '../create-user/CreateUserDTO';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('sendMail-queue') private queue: Queue) {}

  async sendMail(createUserDTO: CreateUserDTO) {
    await this.queue.add('sendMailJob', createUserDTO);
  }
}
