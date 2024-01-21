import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { AuthsUseCases } from '../../use-cases/auths/auths.use-cases';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserDto } from '../../domain/dtos/auths/create-auth.dto';
import { AllowUnauthenticatedRequest } from '@app/common/presentation/decorators/decorator';
import { LocalAuthGuard } from '../../presentation/guards/local-auth.guard';
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

  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Sign in',
    description: 'Login User',
  })
  @ApiProperty({
    type: String,
    required: true,
    name: 'email',
    example: {
      email: 'string',
    },
  })
  @ApiOkResponse({
    description: 'User logged in successfully',
  })
  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginAuthDto, @Request() req) {
    return this.authsService.signIn(req.user);
  }
}
