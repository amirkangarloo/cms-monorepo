import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
}

export async function comparePassword(
  password: string,
  hashPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashPassword);

  return isMatch;
}
