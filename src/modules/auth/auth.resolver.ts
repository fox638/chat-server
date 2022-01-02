import { Response } from 'express';
import { UtilService } from 'modules/common/utils.service';
import { AUTH_COOKIE_NAME } from 'shared/constants';
import {
  AuthMutation,
  AuthStatusEnum,
  SignInInput,
  SignUpPayload,
} from 'shared/generate/gql/graphql';

import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { SignUpInputDto } from './dto/SignUpInputDto';

@Resolver('AuthMutation')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private utilService: UtilService,
  ) {}

  @ResolveField()
  signUp(
    @Args('input') input: SignUpInputDto,
  ): Promise<SignUpPayload> | SignUpPayload {
    return this.authService.signUp(input);
  }

  @ResolveField()
  async signIn(
    @Context() context: any,
    @Args('input') input: SignInInput,
  ): Promise<AuthMutation['signIn']> {
    const user = await this.authService.signIn(input);

    if (user) {
      const authToken = this.utilService.createJWT(user.username);
      const res: Response = context?.req?.res;
      res?.cookie(AUTH_COOKIE_NAME, authToken, {
        httpOnly: true,
      });

      return {
        user,
        userId: user.id,
        status: AuthStatusEnum.Success,
      };
    } else {
      status: AuthStatusEnum.Error;
      errors: {
        message: 'Неверный логин или пароль';
      }
    }
  }
}
