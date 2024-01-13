import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Auths')
@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('register')
  register(@Body() createAuthDto: any) {
    return this.authsService.create(createAuthDto);
  }

  @ApiProperty({
    name: 'Sign in',
    description: 'Login User',
  })
  @Post('login')
  login(@Body() createAuthDto: any) {
    return this.authsService.signIn('David', 'Chris');
  }
}
