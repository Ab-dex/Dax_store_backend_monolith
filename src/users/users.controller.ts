import { Body, Controller, Get, InternalServerErrorException, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserDTO } from './dtos/user.dto';
import { GetUsersQueryDTO } from './dtos/getUserQuery.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  

  @Get()
    @ApiOkResponse({
   type: UserDTO,
   description: 'User credentials',
   isArray: true
 })
  getUsers(@Query(new ValidationPipe({
			transform: true,
			transformOptions: {enableImplicitConversion: true},
			forbidNonWhitelisted: true
		})) query: GetUsersQueryDTO) {
    return this.usersService.getUsers(query)
  }

  @Get("/:id")
    @ApiOperation({
    description: "Get single user by id",
    summary: "Get by Id"
    
    })
    @ApiOkResponse({
      description: "User Retrieved Successfully"
    })
  @ApiNotFoundResponse({
      description: "No user with such Id"
  })
  @ApiBadRequestResponse({
      description: "Bad Request"
    })
  @ApiInternalServerErrorResponse({
      description: "Internal server error"
    })
  @ApiParam({
      name: "id"
    })
  getUserById(@Param("id") id: string) {
    return this.usersService.getOneUserById(id)
    }

    @ApiOperation({
    description: "Create a new user",
    summary: "Sign Up"
    
    })
  @ApiCreatedResponse({
      description: "User successfully created"
  })
    @ApiBadRequestResponse({
        description: "Bad Request"
    })
    @ApiBody({
   type: CreateUserDto,
   description: 'User credentials',
   required: true,
   isArray: false
 })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto ) {
      try {
        return this.usersService.createUser(createUserDto)
      } catch (err) {
        throw InternalServerErrorException
      }
  }
}
