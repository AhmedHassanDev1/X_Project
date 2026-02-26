import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schema/post/posts.schema';
import { PostDTO } from './dto/content.dto';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from 'src/user/dto/user.dto';
import { Interactions } from 'src/schema/interactions.schema';
import { SeachService } from 'src/shared/services/search.service';
import { BookmarkDoc } from "src/interfaces/search"
@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<Post>,
    @InjectModel(Interactions.name) private InteractionsModel: Model<Interactions>,
    private readonly searchService: SeachService
  ) { }


  async getPostById(postId: string) {
    let res = await this.PostModel.findById(postId)
    return res
  }

  getPageInfo(posts, limit: number) {
    const hasNextPage = posts.length > limit;
    const slicedPosts = hasNextPage ? posts.slice(0, limit) : posts;
    const lastPost = slicedPosts[slicedPosts.length - 1];
    const endCursor = lastPost ? new Date(lastPost.createdAt).toISOString() : null;
    return {
      posts: slicedPosts,
      pageInfo: {
        endCursor,
        hasNextPage
      }
    };
  }

  async getHomeContent(
    userId: string,
    cursor?: string,
    limit = 10
  ) {
    const query: any = {
      user: { $ne: userId },
      type: { $ne: 'replay' }
    };

    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }


    const posts = await this.PostModel.find(query)
      .populate('user')
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit + 1)


    return this.getPageInfo(posts, limit)
  }

  async getPostsUserByUserId(
    userId: string,
    cursor?: string,
    limit = 10
  ) {
    const query: any = {
      user: userId,
      type: { $ne: 'replay' }
    };

    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }


    const posts = await this.PostModel.find(query)
      .populate('user')
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit + 1)


    return this.getPageInfo(posts, limit)
  }


  async getReplies(
    userId: string,
    cursor?: string,
    limit = 10
  ) {
    const query: any = {
      user: userId,
      type: { $eq: 'replay' }
    };

    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }


    const posts = await this.PostModel.find(query)
      .populate('user')
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit + 1)


    return this.getPageInfo(posts, limit)
  }

  async getUserLikePosts(
    userId: string,
    cursor?: string,
    limit = 10) {
    const query: any = {
      user: userId,
      type: { $eq: 'replay' }
    };
    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    const likes = await this.InteractionsModel.find({ user: userId, type: "like" })
      .populate("post")
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit + 1);
    let likedPosts = likes.map(like => like.post);

    return this.getPageInfo(likedPosts, limit)

  }

  async getUserBookmarks(
    userId: string,
    q: string,
    cursor?: string,
    limit = 10) {

    let body = {
      query: {}
    }
  
    if (q&&q.length>0) {
      body.query = {
        bool: {
          filter: [
            {
              term: {
                user_id: userId
              }
            }
          ],
          must: [
            {
              match: {
                text: {
                  query: q,
                  operator: "and"
                }
              }
            }
          ]
        }
      }

    } else {
      body.query = {
        term: {
          user_id: {
            value: userId
          }
        }
      }
    }

    let res = await this.searchService.search("bookmarks", body)
    let hits = res.hits.hits
    const ids = hits
      .map((el) => el._source as BookmarkDoc)
      .filter(Boolean)
      .map((src) => src.post_id);
    let posts = await this.PostModel.find({
      _id: { $in: ids }
    })
      .populate("user")
    return this.getPageInfo(posts, limit)


  }

  delete(id: number) {
    return `This action removes a #${id} content`;
  }
}
