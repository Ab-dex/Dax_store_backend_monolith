import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const comparePassword = async (source: string, target: string) => await bcrypt.compare(source, target);
