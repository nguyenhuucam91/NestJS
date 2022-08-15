import { UserTransformer } from './dto/user.dto';
import { Controller, Get, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }
  
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers()
  {
    return this.userService.getUsers().map(user => new UserTransformer(user))
  }

  @Get(":username")
  @UseInterceptors(ClassSerializerInterceptor)
  getUserByUsername(@Param('username') username: string)
  {
    const user = this.userService.getUserByUser(username)
    return new UserTransformer(user)
  }
}
