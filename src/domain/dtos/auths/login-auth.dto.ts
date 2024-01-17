import { PickType } from '@nestjs/swagger';
import { RegisterUserDto } from './create-auth.dto';
import { UserDTO } from '../users';

export class LoginAuthDto extends PickType(UserDTO, ['email', 'password']) {}
