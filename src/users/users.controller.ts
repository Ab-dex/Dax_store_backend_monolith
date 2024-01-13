import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserDTO } from './dtos/user.dto';
import { GetUsersQueryDTO } from './dtos/getUserQuery.dto';
import { Roles } from '@app/common/utils/decorators/decorator';
import { AuthGuard } from '@app/common/utils/guards/Auth.guard';
import { RolesGuard } from '@app/common/utils/guards/Role.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({
    type: UserDTO,
    description: 'User credentials',
    isArray: true,
  })
  @ApiQuery({
    name: 'firstname',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'lastname',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'email',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'currentPage',
    type: Number,
    required: false,
  })
  getUsers(
    @Query()
    query: GetUsersQueryDTO,
  ) {
    return this.usersService.getUsers(query);
  }

  @Get('/:id')
  @ApiOperation({
    description: 'Get single user by id',
    summary: 'Get by Id',
  })
  @ApiOkResponse({
    description: 'User Retrieved Successfully',
  })
  @ApiNotFoundResponse({
    description: 'No user with such Id',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiParam({
    name: 'id',
  })
  getUserById(@Param('id') id: string) {
    return this.usersService.getOneUserById(id);
  }

  /**
   *
   * @param createUserDto
   * @returns create new user
   */
  @ApiOperation({
    description: 'Create a new user',
    summary: 'Sign Up',
  })
  @ApiCreatedResponse({
    description: 'User successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  // @ApiExcludeEndpoint()
  @Post()
  @Roles('admin', 'user')
  @UseGuards(AuthGuard, RolesGuard)
  createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (err) {
      throw InternalServerErrorException;
    }
  }
}
