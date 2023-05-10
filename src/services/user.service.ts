import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from 'src/models/user';

export interface IUserDTO {
  id: string;
  email: string;
  token: string;
}

export interface IUserInputData {
  email: string;
  password: string;
  name: string;
}

export interface IUsersDTO {
  id: string;
  email: string;
}

@Injectable()
export class UserService {
  saltRounds = 10;

  constructor(private prismaService: PrismaService) {}

  async saveUser(userData: IUserInputData): Promise<IUserDTO> {
    try {
      // validate email and password
      // ...
      const salt = await new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(this.saltRounds, (err, salt) => {
          if (err) {
            reject(err);
          }
          resolve(salt);
        });
      });
      const hash = await new Promise<string>((resolve, reject) => {
        bcrypt.hash(userData.password, salt, (err, hash) => {
          if (err) {
            reject(err);
          }
          resolve(hash);
        });
      });

      const user = new UserModel(
        userData.email,
        userData.password,
        userData.name,
        hash,
        salt,
      );
      const createdUser = await this.prismaService.user.create({ data: user });
      const token = jwt.sign(user, process.env.JWT_KEY, { expiresIn: '1d' });
      return {
        email: createdUser.email,
        id: createdUser.id,
        token,
      } as IUserDTO;
    } catch (error) {
      return error;
    }
  }

  async getUsers(): Promise<Array<IUsersDTO>> {
    try {
      const users = await this.prismaService.user.findMany();
      const usersDTO: Array<IUsersDTO> = [];

      users.forEach((user: User) => {
        usersDTO.push({
          id: user.id,
          email: user.email,
        });
      });

      if (usersDTO.length == 0) throw new Error('No users found');
      return usersDTO;
    } catch (error) {
      return error;
    }
  }
}
