import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Types } from 'src/Constants';
import { Model } from 'mongoose';
import { UserModel } from './model/user.model';
import { CreateUserDto } from './dtos/createUser.dto';
import { Result } from '@app/common/domain/result';
import { UserDTO } from './dtos/user.dto';
import { UserMapper } from './mapper/User.mapper';
import { UserRepository } from './repository/user.repository';


describe('UsersService', () => {
  let service: UsersService;
  let model: Model<UserModel>
  let userMapper: UserMapper

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn()
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {provide: UserMapper,useValue: UserMapper}, {provide: UserRepository,useValue: mockRepository}],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  /**
   * should accept only allowed entity structure
   * should return a promise containing the response data
   * make sure same email is not used twice
   * User has strong password
   */

  describe('create', () => {
  it('create => should create a new user', async () => {

    // arrange

    const createUserDTO = {
      email: "a@gmail.com",
    firstname: "David",
      lastname: "Chris",
      password: "written",
        // created_At: Date.now().toString()
    } as CreateUserDto

      const createUserModel = {
      email: "a@gmail.com",
    firstname: "David",
      lastname: "Chris",
      password: "written",
        created_At: "12345"
    } as UserModel

    const user = Result.ok({
      id: Date.now().toString(),
      firstname: "David",
      lastname: "Chris",
    }) as unknown as Result<UserDTO>

    jest.spyOn(mockRepository, 'create').mockReturnValue(user)

    // act
    // const result = await service.createUser(createUserDTO)

    // assert
    
    // expect(mockRepository.create).toBeCalled()
    expect(mockRepository.create).toBeCalledWith(createUserModel)

    // expect(result).toEqual(user)
  })
  })
  

});
