import { Body, Controller, Post } from '@nestjs/common';
import { SendMailProducerService } from '../jobs/SendMail-producer.service';
import { CreateUserDTO } from './CreateUserDTO';

@Controller('create-user')
export class CreateUserController {
  constructor(private sendMailService: SendMailProducerService) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDTO) {
    this.sendMailService.sendMail(createUser);
    return createUser;
  }
}
