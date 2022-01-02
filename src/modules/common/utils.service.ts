import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UtilService {
  createRandomString(length: number) {
    return Math.random()
      .toString(36)
      .replace(/[^a-zA-Z0-9]+/g, '')
      .substr(0, length);
  }

  generateHash(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  checkPassword(password: string, passwordHash: string) {
    return bcrypt.compareSync(password, passwordHash);
  }

  createJWT(username: string): string {
    const token = jwt.sign(
      {
        username,
      },
      process.env.JWT_TOKEN || '',
    );
    return token;
  }

  verifyToken(authToken: string) {
    const decodeToken = jwt.verify(
      authToken,
      process.env.JWT_TOKEN || '',
    ) as any;
    return decodeToken?.username;
  }
}
