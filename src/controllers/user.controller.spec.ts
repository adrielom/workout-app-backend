import { PrismaService } from '../services/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService, IUserDTO, IUsersDTO } from '../services/user.service';
import { UserController } from './user.controller';

describe('UsersController Test Module', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('Should return a list of Users of type UsersDTO', async () => {
      const arrayOfUsers = [
        {
          id: '4a21871c-37b9-421b-aec5-5e8c84d5cd47',
          email: 'adriel@gmail.com',
        },
      ] as Array<IUsersDTO>;

      expect(await userController.getUsers()).toBeTruthy();

      expect(await userController.getUsers()).toEqual(arrayOfUsers);

      expect(await userController.getUsers()).toMatchObject(arrayOfUsers);
    });
  });
});
