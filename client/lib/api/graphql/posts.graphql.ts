import { getBookmarksQueryType, getHomePosts, getMediaQueryType, getPostByIdQueryType, getPostsQueryType, } from "@/types/post";
import { gql } from "@apollo/client";

export const getPostById: getPostByIdQueryType = gql`
 query GetPostById($id:String!){
    post:getPostById(id:$id){
        ...PostFragment
        isLike
        isBookmark
        media {
                ...MediaFragment
            }
        user {
                ...UserFragment
            }   
        statistics {
            replies_count
            likes_count
            view_count
             reposts_count
            }
    }
 }`;


export const getUserPosts: getPostsQueryType = gql`
 query GetUserPosts($userId:String!,$limit:Int,$cursor:String) {
    posts:getUserPosts(userId: $userId,limit:$limit,cursor:$cursor) {
         posts{
          ...PostFragment
          isLike
          isBookmark
          statistics {
                replies_count
                likes_count
                view_count
                reposts_count
            }
          original_post {
           ...PostFragment
           media {
             ...MediaFragment
            }
           user {
                ...UserFragment
            }   
         
           
          }
          user {
                ...UserFragment
            }    
          media {
                ...MediaFragment
            }
         }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}`;

export const getUserMedia: getMediaQueryType = gql`
 query GetUserMedia($userId:String!,$limit:Int,$cursor:String) {
    media:getUserPosts(userId: $userId,limit:$limit,cursor:$cursor) {
         posts{
            media {
                ...MediaFragment
            }
             statistics {
                replies_count
                likes_count
                view_count
                reposts_count
            }
         }
         pageInfo {
               hasNextPage
            endCursor
        }
    }
}`;

export const getUserPostsLike: getPostsQueryType = gql`
 query GetUserLikePosts($userId:String!,$limit:Int,$cursor:String) {
    posts:getUserLikePosts(userId: $userId,limit:$limit,cursor:$cursor) {
         posts{
          ...PostFragment
          isLike
          isBookmark
           statistics {
                replies_count
                likes_count
                view_count
                reposts_count
            }
          original_post {
           ...PostFragment
           media {
             ...MediaFragment
            }
           user {
                ...UserFragment
            }   
         
           
          }
          user {
                ...UserFragment
            }    
          media {
                ...MediaFragment
            }
         }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}`;

export const getUserPostsBookmarks: getBookmarksQueryType = gql`
 query GetUserPostsBookmarks($limit:Int,$cursor:String,$q:String) {
    posts:getUserPostsBookmarks(limit:$limit,cursor:$cursor,q:$q) {
         posts{
          ...PostFragment
          isLike
          isBookmark
           statistics {
                replies_count
                likes_count
                view_count
                reposts_count
            }
          original_post {
           ...PostFragment
           media {
             ...MediaFragment
            }
           user {
                ...UserFragment
            }   
         
           
          }
          user {
                ...UserFragment
            }    
          media {
                ...MediaFragment
            }
         }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}`;

export const getHomePostsQuery: getHomePosts = gql`
 query GetHomeContent($limit:Int,$cursor:String) {
    posts:getHomeContent(limit:$limit,cursor:$cursor) {
         posts{
          ...PostFragment
          isLike
          isBookmark
           statistics {
                replies_count
                likes_count
                view_count
                reposts_count
            }
          original_post {
           ...PostFragment
           media {
             ...MediaFragment
            }
           user {
                ...UserFragment
            }   
         
           
          }
          user {
                ...UserFragment
            }    
          media {
                ...MediaFragment
            }
         }
        pageInfo {
            hasNextPage
            endCursor
        }
    }
}`;