import { UserType } from "@/types/user";
import { TypedDocumentNode } from "@apollo/client";
import { EmojiClickData } from "emoji-picker-react";
import { RefObject } from "react";

export type uploadFileType = {
    _id: string
    index:number

    file: File
    url: string,
    type: string
    width: number,
    height: number
    thumbnail?: string | null
    fileName?: string

}

type ProgressBarType = {
    media_id: string
    fileName: string
    progress: number
    completed: boolean
}
export type CreatePostContextType = {
    textContent: string | null
    media: uploadFileType[]
    mediaResources: MediaResource[]
    postState: "ready" | "pending" | "success" | null
    setMediaResources: React.Dispatch<React.SetStateAction<MediaResource | MediaResource[] | null>>;
    setTextContent: React.Dispatch<React.SetStateAction<string | null>>;
    setMedia: React.Dispatch<React.SetStateAction<uploadFileType | uploadFileType[] | null>>;
    setProgressBars: React.Dispatch<React.SetStateAction<ProgressBarType[] | null>>;
    rest: () => void
    setPostState: React.Dispatch<React.SetStateAction<"ready" | "pending" | "success" | null>>;
    handleSelectEmoji: (emojiObject: EmojiClickData) => void
    inputRef: RefObject<HTMLInputElement> | null
    progressBars: ProgressBarType[]
}
export type MediaResource = {
    public_id: string;
    url: string;
    width: number;
    height: number;
    size: number;
    type: string;
    format: string

}

export type MediaQueryType = {
    _id: string,
    url: string,
    width: number,
    height: number
    type: "image" | "video"
    format: string
    thumbnail?: string | null
}

export type statisticsQueryType = {
    replies_count: number;
    likes_count: number;
    view_count: number;
    reposts_count: number;
    createdAt: Date;
    updatedAt: Date;
}

export type PostType = {
    _id: string;
    text: string;
    user: {
        _id: string
        name: string;
        image: string


    }
    original_post: PostType
    type: string;
    media: MediaQueryType[]
    statistics: statisticsQueryType
    isLike: boolean
    isBookmark: boolean
    createdAt: string;
}

type Posts = {
    posts: {
        posts: PostType[];
        pageInfo: {
            hasNextPage: boolean;
            endCursor: string | null;
        }
    }
}

export type PageInfo = {
    endCursor: string | null
    hasNextPage: boolean
}
export type GetPostsQueryVariables = {
    userId: string | string[] | undefined
    cursor: string | string[] | undefined
    limit: number | number[] | undefined
}
export type GetBookmarksQueryVariables = {
    q?: string | undefined
    cursor?: string | string[] | undefined
    limit: number | number[] | undefined
}
export type GetHomePostsQueryVariables = {
    cursor?: string | string[] | undefined
    limit: number | number[] | undefined
}
export type GetPostByIdQueryVariables = {
    id: string | undefined
}
export type getPostByIdQueryType = TypedDocumentNode<{ post: PostType }, GetPostByIdQueryVariables>
export type getHomePosts = TypedDocumentNode<Posts, GetHomePostsQueryVariables>
export type getPostsQueryType = TypedDocumentNode<Posts, GetPostsQueryVariables>;
export type getBookmarksQueryType = TypedDocumentNode<Posts, GetBookmarksQueryVariables>;
export type getMediaQueryType = TypedDocumentNode<{
    media: {
        posts: MediaQueryType[] | undefined
        pageInfo: PageInfo
    }

}, { userId: string | string[] | undefined }>;