import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersUseCases } from '../../use-cases/users/users.use-cases';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersUseCases],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
