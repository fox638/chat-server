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
export const MAX_AGE = 60 * 60 * 8; // 8 hours
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
    const [user, error] = await this.authService.signIn(input);

    if (user) {
      const authToken = this.utilService.createJWT(user.username);
      const res: Response = context?.req?.res;

      res?.cookie(AUTH_COOKIE_NAME, authToken, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'lax',
      });

      return {
        user,
        token: authToken,
        userId: user.id,
        status: AuthStatusEnum.Success,
      };
    } else {
      return {
        status: AuthStatusEnum.Error,
        errors: {
          message: error.message || 'Неверный логин или пароль',
        },
      };
    }
  }
}
