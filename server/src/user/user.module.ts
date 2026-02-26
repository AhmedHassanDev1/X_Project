import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user/user.schema';
import { MongoIdValidationPipe } from 'src/shared/pipe/mongoID.pipe';
import { CloudinaryService } from 'src/shared/services/cloud.service';
import { Follow, FollowSchema } from 'src/schema/user/follow.schema';
import { SeachService } from 'src/shared/services/search.service';
import { SearchModule } from 'src/shared/modules/search.module';


@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }, {
      name: Follow.name,
      schema: FollowSchema
    }]),
    SearchModule
  ],
  controllers: [UserController],
  providers: [UserService, MongoIdValidationPipe, CloudinaryService],
  exports: [UserService]
})
export class UserModule { }
