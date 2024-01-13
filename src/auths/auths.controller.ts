import { Controller, Post, Body } from '@nestjs/common';
import { AuthsService } from './auths.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserDto } from './dto/create-auth.dto';
import { AllowUnauthenticatedRequest } from '@app/common/utils/decorators/decorator';

@ApiTags('Auths')
// @AllowUnauthenticatedRequest()
@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('register')
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
  register(@Body() createAuthDto: RegisterUserDto) {
    return this.authsService.create(createAuthDto);
  }

  @ApiProperty({
    name: 'Sign in',
    description: 'Login User',
  })
  @Post('login')
  login(@Body() loginAuthDto: Pick<RegisterUserDto, 'email' | 'password'>) {
    return this.authsService.signIn('David', 'Chris');
  }
}
