import jwt, { SignOptions } from 'jsonwebtoken';

export default class JWTManager {
  private static readonly tokenOptions: SignOptions = { algorithm: 'HS512', expiresIn: '1h' };
  private static readonly salt: string = 'salt';

  public static generateToken(content: object): string {
    const token = jwt.sign(content, this.salt, this.tokenOptions);

    return token;
  }

  public static validateToken(token: string) {
    const payload = jwt.verify(token, this.salt) as string;

    return payload;
  }
}
