import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService, UserDTO } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK | HttpStatus.NOT_FOUND)
  async getUsers(): Promise<Array<UserDTO>> {
    return await this.userService.getUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED | HttpStatus.BAD_REQUEST)
  async postUser(): Promise<UserDTO> {
    return {} as UserDTO;
  }
}
