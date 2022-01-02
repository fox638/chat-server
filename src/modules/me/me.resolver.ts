import { Args, ResolveField, Resolver, Context } from '@nestjs/graphql';
import { UserDto } from 'user/dto/user.dto';

@Resolver('MeQuery')
export class MeResolver {
  @ResolveField()
  async user(@Context() context: any) {
    const user: UserDto = context?.user;
    return user;
  }
}
