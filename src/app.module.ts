import * as cookie from 'cookie';
import { CommonModule } from 'modules/common/common.module';
import { UtilService } from 'modules/common/utils.service';
import { RootGqlModule } from 'modules/root/root.module';
import { join } from 'path';
import { getConnectionOptions, getRepository } from 'typeorm';
import { UserRepository } from 'user/repositories';
import { UserModule } from 'user/user.module';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CommonModule,

    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          synchronize: true,
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        });
      },
      inject: [],
    }),
    RootGqlModule,
    GraphQLModule.forRootAsync({
      useFactory: async (
        utilService: UtilService,
        userRepository: UserRepository,
      ) => ({
        typePaths: ['./**/*.graphql'],
        installSubscriptionHandlers: true,
        include: [],

        context: async (context) => {
          if (context?.req?.headers?.cookie) {
            const cookiesParse = cookie.parse(context.req.headers.cookie);
            context.req.cookies = cookiesParse;

            if (cookiesParse?.authToken) {
              const username = utilService.verifyToken(cookiesParse?.authToken);
              const user = await userRepository.findOne({ username });
              context.user = user.toDto();
            }
          }

          return context;
        },
        playground: {
          settings: {
            'request.credentials': 'include',
          },
        },
      }),
      inject: [UtilService, UserRepository],
      imports: [UserModule],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
