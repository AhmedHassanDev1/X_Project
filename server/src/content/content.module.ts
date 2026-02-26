import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { UserService } from 'src/user/user.service';
import { ContentResolver } from './resolvers/content.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schema/post/posts.schema';
import { User, UserSchema } from 'src/schema/user/user.schema';
import { Interactions, InteractionsSchema } from 'src/schema/interactions.schema';
import { SearchModule } from 'src/shared/modules/search.module';
import { InteractionsService } from 'src/interactions/interactions.service';
import { Follow ,FollowSchema} from 'src/schema/user/follow.schema';
import { AuthorResolver } from './resolvers/author.resolver';



@Module({
  imports: [
    SearchModule,
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema
      },
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Interactions.name,
        schema: InteractionsSchema
      },{
      name: Follow.name,
      schema: FollowSchema
    }
    ])
  ],
  providers: [ContentResolver,AuthorResolver, ContentService, UserService,InteractionsService],
  exports: [ContentResolver,AuthorResolver]
})
export class ContentModule { }
