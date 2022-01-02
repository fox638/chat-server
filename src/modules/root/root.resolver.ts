import { Mutation, Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class RootResolver {
  @Mutation()
  auth() {
    return {};
  }

  @Query()
  me() {
    return {};
  }
}
