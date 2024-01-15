import * as bcrypt from 'bcrypt';
export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);
