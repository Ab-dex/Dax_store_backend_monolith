import { Test, TestingModule } from '@nestjs/testing';
import { AuthsController } from './auths.controller';
import { AuthsUseCases } from '../../use-cases/auths/auths.use-cases';

describe('AuthsController', () => {
  let controller: AuthsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthsController],
      providers: [AuthsUseCases],
    }).compile();

    controller = module.get<AuthsController>(AuthsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
