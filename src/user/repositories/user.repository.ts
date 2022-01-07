import { AuthenticationError } from 'apollo-server-express';
import * as bcrypt from 'bcryptjs';
import { SignUpInputDto } from 'modules/auth/dto';
import { SignInInput } from 'shared/generate/gql/graphql';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from 'user/dto/user.dto';
import { UserEntity } from 'user/entities/user.entity';

import { Maybe } from '@graphql-tools/utils';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  constructor() {
    super();
  }

  async signUp(
    input: SignUpInputDto,
  ): Promise<[user: Maybe<UserDto>, error: Maybe<Error>]> {
    const { email, password, username } = input;
    const salt = await bcrypt.genSalt();

    const user = this.create({
      username,
      salt,
      email,
      password: await this.hashPassword(password, salt),
    });

    try {
      await user.save();

      return [user.toDto(), null];
    } catch (error) {
      return [null, error];
    }
  }

  async signIn(
    input: SignInInput,
  ): Promise<[user: Maybe<UserDto>, error: Maybe<Error>]> {
    const { username, password } = input;
    const user = await this.findOne({ username });

    if (await user.validationPassword(password)) {
      return [user.toDto(), null];
    } else {
      return [null, new AuthenticationError('AuthenticationError')];
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  getUserWithUsername = (username: string) => {
    return this.findOne({ username });
  };

  getUserWithEmail = (email: string) => {
    return this.findOne({ email });
  };

  getUserWithId = (userId: number) => {
    return this.findOne(userId);
  };
}
