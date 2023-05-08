import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

export interface UserDTO {
  id: string;
  email: string;
  token: string;
}

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers(): Promise<Array<UserDTO>> {
    try {
      const users = await this.prismaService.user.findMany();
      const usersDTO: Array<UserDTO> = [];

      users.forEach((user: User) => {
        usersDTO.push({
          id: user.id,
          email: user.email,
          token: 'blablabla',
        });
      });

      if (usersDTO.length == 0) throw new Error('No users found');
      return usersDTO;
    } catch (error) {
      return error;
    }
  }
}
