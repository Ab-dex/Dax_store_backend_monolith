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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auths')
@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('register')
  register(@Body() createAuthDto: any) {
    return this.authsService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() createAuthDto: any) {
    return this.authsService.create(createAuthDto);
  }
}
