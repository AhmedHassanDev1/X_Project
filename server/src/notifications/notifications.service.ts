import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { ForbiddenException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from 'src/schema/notifications.schema';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly mailer: MailerService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        @InjectModel(Notification.name) private NotificationModel: Model<Notification>
    ) { }

    async sendEmail(email: string) {
        let expireIn = 1000 * 60 * 5
        let code = Array(5).fill(null).map(() => Math.round(Math.random() * 9)).join("")
        await this.mailer.sendMail({
            to: email,
            subject: code
        })
        await this.cacheManager.set(email, code, expireIn)
    }

    async emailVerification(email: string, code: string) {
        let isValid = await this.cacheManager.get(email)
        if (!isValid || isValid != code) {
            throw new NotFoundException("invalid code or expire.")
        }
        return {
            verify: true
        }
    }

    async create(sender_id: string, receiver_id: string, type: string, post_id: string) {
        console.log("notification creating");
        
        return  await this.NotificationModel.create({ sender_id, receiver_id, type,  post_id });
    }
}
