import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      context: ({ req, res }) => ({ req, res }),
      typeDefs: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: 'ignore',
      },
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.generated.ts'),
        outputAs: 'class',
      },
      debug: true,
      introspection: true,
      playground: true,
      cors: false,
    };
  }
}
