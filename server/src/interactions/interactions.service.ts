import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schema/post/posts.schema';
import { CreatePostRequestDTO } from './dto/interactions.dto';
import { Interactions } from 'src/schema/interactions.schema';
import { EventEmitter2 } from "@nestjs/event-emitter"
import { User } from 'src/schema/user/user.schema';
import { SeachService } from 'src/shared/services/search.service';
import { Follow } from 'src/schema/user/follow.schema';

@Injectable()
export class InteractionsService {
    constructor(
        @InjectModel(Post.name) private PostModel: Model<Post>,
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Interactions.name) private InteractionsModel: Model<Interactions>,
        @InjectModel(Follow.name) private FollowModel: Model<Follow>,
        private readonly searchService: SeachService,

        private eventEmitter: EventEmitter2,
    ) { }

    async findOne(userId: string, postId, type: string) {
        return await this.InteractionsModel.findOne({
            user: userId,
            post: postId,
            type
        })
    }

    async CreatePost(userId: string, body: CreatePostRequestDTO) {
        let newPost = new this.PostModel({ user: userId, ...body })
        await newPost.save()
        this.UserModel.updateOne({ _id: userId }, { posts_count: { $inc: 1 } })
        this.searchService.indexing("posts", newPost)
    }

    async toggleLike(userId: string, postId: string) {

        const post = await this.PostModel.findById(postId);
        if (!post) throw new NotFoundException("Post not found");

        const user = await this.UserModel.findById(userId);
        if (!user) throw new NotFoundException("User not found");


        const interaction = await this.InteractionsModel.findOne({ user: userId, post: postId, type: "like" });

        let likeChange = 0;

        if (interaction) {

            await this.InteractionsModel.deleteOne({ user: userId, post: postId, type: "like" });
            likeChange = -1;
        } else {

            await this.InteractionsModel.create({ user: userId, post: postId, type: "like" });
            likeChange = 1;
        }


        await Promise.all([
            this.PostModel.updateOne(
                { _id: postId },
                { $inc: { 'statistics.likes_count': likeChange } }
            ),
            this.UserModel.updateOne(
                { _id: userId },
                { $inc: { likes_count: likeChange } }
            )
        ]);
    }
    async toggleBookmarked(userId: string, postId: string) {

        const post = await this.PostModel.findById(postId);
        if (!post) throw new NotFoundException("Post not found");

        const interaction = await this.InteractionsModel.findOne({ user: userId, post: postId, type: "bookmark" });

        if (interaction) {

            await this.InteractionsModel.deleteOne({ user: userId, post: postId, type: "bookmark" });
            await this.searchService.deleteBookmark(userId, postId)
        } else {
            const doc = await this.InteractionsModel.create({ user: userId, post: postId, type: "bookmark" });
            const { user: user_id, post: post_id, createdAt } = doc.toObject() as any;
            const text = post.text

            await this.searchService.bookmarkIndexing({ user_id, post_id, text, createdAt })
        }


    }

    async toggleFollow(userId: string, followingId: string) {

        const user = await this.UserModel.findById(followingId);
        if (!user) throw new NotFoundException("Post not found");

        const interaction = await this.FollowModel.findOne({ follower: userId, following: followingId });

        if (interaction) {

            await this.FollowModel.deleteOne({ follower: userId, following: followingId });

        } else {
            const doc = await this.FollowModel.create({ follower: userId, following: followingId });
        }


    }
} 