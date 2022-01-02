import { EmailService } from 'modules/common/email.service';
import {
  AuthStatusEnum,
  SignInInput,
  SignUpPayload,
} from 'shared/generate/gql/graphql';
import { UserRepository } from 'user/repositories/user.repository';

import { Injectable } from '@nestjs/common';

import { SignUpInputDto } from './dto/SignUpInputDto';

@Injectable()
export class AuthService {
  constructor(
    public readonly userRepository: UserRepository,
    private emailService: EmailService,
  ) {}

  async signUp(input: SignUpInputDto): Promise<SignUpPayload> {
    const { username, email } = input;

    if (await this.userRepository.getUserWithEmail(email)) {
      return {
        status: AuthStatusEnum.Error,
        errors: {
          __typename: 'AuthValidationError',
          message: 'email уже используется',
          errors: [
            {
              message: 'email уже используется',
              name: 'email',
            },
          ],
        },
      };
    }

    if (await this.userRepository.getUserWithUsername(username)) {
      return {
        status: AuthStatusEnum.Error,
        errors: {
          __typename: 'AuthValidationError',
          message: 'username уже используется',
          errors: [
            {
              message: 'username уже используется',
              name: 'username',
            },
          ],
        },
      };
    }

    const [user, error] = await this.userRepository.signUp(input);

    if (error) {
      throw error;
    }

    return {
      userId: user?.id,
      user: user,
      status: AuthStatusEnum.Success,
    };
  }

  async signIn(input: SignInInput) {
    const [user, error] = await this.userRepository.signIn(input);
    if (error) {
      throw error;
    }

    return user;
  }
}
