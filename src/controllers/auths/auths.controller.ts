import { Controller, Post, Body } from '@nestjs/common';
import { AuthsUseCases } from '../../use-cases/auths/auths.use-cases';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserDto } from '../../domain/dtos/auths/create-auth.dto';
import { AllowUnauthenticatedRequest } from '@app/common/presentation/decorators/decorator';
import { LoginAuthDto } from '../../domain/dtos/auths/login-auth.dto';

@ApiTags('Auths')
@AllowUnauthenticatedRequest()
@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsUseCases) {}

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
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authsService.signIn(loginAuthDto.email, loginAuthDto.password);
  }
}
