import { Resolver, Query, ResolveField, Parent, Args, Mutation, Int, } from '@nestjs/graphql';
import { ContentService } from '../content.service';
import { Post, PostConnection } from '../models/post.model';
import { CurrentUser } from 'src/shared/decorator/currentUser.decorator';
import { UserService } from 'src/user/user.service';
import { Author } from '../models/Author.model';
import { InteractionsService } from 'src/interactions/interactions.service';


@Resolver(() => Post)
export class ContentResolver {
    constructor(
        private readonly contentService: ContentService,
        private readonly userService: UserService,
        private readonly interactionsService: InteractionsService
    ) { }

    @Query(() => Post)
    async getPostById(
        @Args("id") id: string
    ) {
              
        return await this.contentService.getPostById(id);
    }

    @Query(() => PostConnection)
    async getHomeContent(
        @CurrentUser("_id") userId: string,
        @Args("cursor", { nullable: true }) cursor?: string,
        @Args("limit", { nullable: true, type: () => Int }) limit?: number,
    ) {
        return await this.contentService.getHomeContent(userId, cursor, limit);
    }
    @Query(() => PostConnection)
    async getUserPosts(
        @Args("userId") userId: string,
        @Args("cursor", { nullable: true }) cursor?: string,
        @Args("limit", { nullable: true, type: () => Int }) limit?: number,
    ) {
        return await this.contentService.getPostsUserByUserId(userId, cursor, limit);
    }

    @Query(() => PostConnection)
    async getUserReplies(
        @Args("userId") userId: string,
        @Args("cursor", { nullable: true }) cursor?: string,
        @Args("limit", { nullable: true, type: () => Int }) limit?: number
    ) {
        return await this.contentService.getReplies(userId)
    }

    @Query(() => PostConnection)
    async getUserLikePosts(
        @Args("userId") userId: string,
        @Args("cursor", { nullable: true }) cursor?: string,
        @Args("limit", { nullable: true, type: () => Int }) limit?: number
    ) {
        return await this.contentService.getUserLikePosts(userId, cursor, limit);
    }

    @Query(() => PostConnection)
    async getUserPostsBookmarks(
        @CurrentUser("_id") userId: string,
        @Args("q", { nullable: true }) query: string,
        @Args("cursor", { nullable: true }) cursor?: string,
        @Args("limit", { nullable: true, type: () => Int }) limit?: number
    ) {
        return await this.contentService.getUserBookmarks(userId, query, cursor, limit)
    }


    @ResolveField(() => Post)
    async original_post(@Parent() post: Post) {
        if (!post.original) return null;
        return await this.contentService.getPostById(post.original);
    }

    @ResolveField(() => Author)
    async user(@Parent() post: Post) {
        let author = await this.userService.getProfileInfo(post.user)
        return author
    }

    @ResolveField(() => Boolean)
    async isLike(@Parent() post: Post, @CurrentUser("_id") userId: string) {
        let isExists = await this.interactionsService.findOne(userId, post._id, "like")
        return !!isExists
    }

    @ResolveField(() => Boolean)
    async isBookmark(@Parent() post: Post, @CurrentUser("_id") userId: string) {
        let isExists = await this.interactionsService.findOne(userId, post._id, "bookmark")
        return !!isExists
    }

    @ResolveField(() => Boolean)
    async isRepost(@Parent() post: Post, @CurrentUser("_id") userId: string) {
        let isExists = await this.interactionsService.findOne(userId, post._id, "repost")
        return !!isExists
    }
}