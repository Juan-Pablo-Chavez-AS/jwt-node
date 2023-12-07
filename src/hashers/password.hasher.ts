import bcrypt from 'bcrypt';

export default class PasswordHasher {

  public static hash(password: string): string {
    const hashedPassword = bcrypt.hashSync(password, 15);

    return hashedPassword;
  }

  public static compareHash (password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
