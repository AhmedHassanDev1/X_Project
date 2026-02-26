import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { InteractionsModule } from './interactions/interactions.module';
import { ContentModule } from './content/content.module';

import Joi from 'joi';
import { GraphQLModule, } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ContentResolver } from './content/resolvers/content.resolver';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(8000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        ELASTIC_SEARCH_URL: Joi.string().required(),
        ELASTIC_SEARCH_NAME: Joi.string().required(),
        ELASTIC_SEARCH_PASS: Joi.string().required(),

      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("DATABASE_URL"),
        
        
      }),
    }),
    EventEmitterModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
     autoSchemaFile:"src/schema.gql"
    }),
    AuthModule,
    UserModule,
    NotificationsModule,
    InteractionsModule,
    ContentModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
