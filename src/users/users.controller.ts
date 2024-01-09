import { Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  

  @Get()
  getUsers() {
    return this.usersService.getUsers()
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
        this.usersService.createUser(createUserDto)
      } catch (err) {
        throw InternalServerErrorException
      }
  }
}
