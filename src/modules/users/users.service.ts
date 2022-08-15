import { UserTransformer } from './dto/user.dto';
import { ClassSerializerInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { UserDTO } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  users: UserDTO[] = [
    {
      username: 'anson',
      password: 'dany'
    },
    {
      username: 'smith',
      password: 'smith'
    }
  ]

  getUsers() {
    return this.users
  }

  getUserByUser(username: string): UserDTO {
    return this.users.find(user => user.username == username)
  }
}
