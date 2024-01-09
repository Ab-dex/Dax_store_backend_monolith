import { Body, Controller, Get, InternalServerErrorException, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  

  @Get()
  getUsers() {
    return this.usersService.getUsers()
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
