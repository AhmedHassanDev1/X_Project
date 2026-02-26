import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schema/post/posts.schema';
import { CloudinaryService } from 'src/shared/services/cloud.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanupService } from 'src/shared/services/cleanup.service';
import { TempFilesManagmentService } from 'src/shared/services/tempFiles.service';
import { Interactions, InteractionsSchema } from 'src/schema/interactions.schema';
import { InteractionsGateway } from './interactions.gateway';
import { User, UserSchema } from 'src/schema/user/user.schema';
import { SearchModule } from 'src/shared/modules/search.module';
import { Follow, FollowSchema } from 'src/schema/user/follow.schema';


@Module({
  imports: [
    SearchModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Post.name,
        schema: PostSchema
      }, {
        name: Interactions.name,
        schema: InteractionsSchema
      }, {
        name: Follow.name,
        schema: FollowSchema
      }
    ]),
    CacheModule.register(),
    ScheduleModule.forRoot(),

  ],
  controllers: [InteractionsController],
  providers: [
    InteractionsService,
    CloudinaryService,
    TempFilesManagmentService,
    CleanupService,
    InteractionsGateway
  
  ],
  exports: [InteractionsGateway]
})
export class InteractionsModule { }
