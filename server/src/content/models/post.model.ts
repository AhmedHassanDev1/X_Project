import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Author } from "./Author.model";
import { Statistics } from "./statistics.model";



@ObjectType()
export class Media {
  @Field()
  _id: string;

  @Field()
  url: string;

  @Field(() => Int)
  width: number;

  @Field(() => Int)
  height: number;
  
  @Field()
  type: string;

  @Field()
  format: string;

  @Field({ nullable: true })
  thumbnail?: string;
}


@ObjectType()
export class Post {
  @Field()
  _id: string;

  @Field(() => Author)
  user?: Author;
  
  @Field({ nullable: true })
  original?: string;

  @Field(() => Post, { nullable: true })
  original_post?: Post;

  @Field({ nullable: true })
  text?: string;

  @Field()
  type: string;

  @Field(() => [Media], { nullable: true })
  media?: Media[];

  @Field(() => Statistics)
  statistics: Statistics
  
  @Field()
  isLike:boolean
  
  @Field()
  isBookmark:boolean
  
  @Field()
  isRepost:boolean
  
  @Field()
  createdAt: string;
}



@ObjectType()
export class PageInfo {
  @Field()
  hasNextPage: boolean; 
  
  @Field({nullable: true})
  endCursor: string; 
}


@ObjectType()
export class PostConnection {
  @Field(() => [Post], { nullable: 'itemsAndList' })
  posts: Post[];  
   
  @Field(() => PageInfo)
  pageInfo: PageInfo;

}

