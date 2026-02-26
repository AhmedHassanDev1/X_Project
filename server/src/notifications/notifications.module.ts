import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'src/schema/notifications.schema';
import { NotificationsListener } from './notifications.listener';
import { InteractionsGateway } from 'src/interactions/interactions.gateway';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>("EMAIL_HOST"),
          port: config.get<string>("EMAIL_PORT"),
          auth: {
            user: config.get<string>("EMAIL_USERNAME"),
            pass: config.get<string>("EMAIL_PASSWORD"),
          },
          secure: false,
          tls: { rejectUnauthorized: false },
          default: {
            from: config.get<string>("EMAIL_FROM"),
          }
        }
      })
    }),
    CacheModule.register(),
    MongooseModule.forFeature([{
      name: Notification.name,
      schema: NotificationSchema
    }]),
  
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService,NotificationsListener,InteractionsGateway],
  exports: [NotificationsService]
})
export class NotificationsModule { }
