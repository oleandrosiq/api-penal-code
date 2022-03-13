import { hash, genSalt } from 'bcrypt';

export async function encryptPassword(password: string) {
  const salt = await genSalt();
  const cryptPassword = await hash(password, salt);

  return cryptPassword;
}
