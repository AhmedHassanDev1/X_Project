import { PostType } from "@/types/post"

import MediaBox from "./MediaBox";
import PostHeader from "./PostHeader";
import ShareButton from "../../buttons/interactions/ShareButton";
import BookmarkButton from "../../buttons/interactions/BookmarkButton";
import LikeButton from "../../buttons/interactions/LikeButton";
import RepostButton from "../../buttons/interactions/RepostButton";
import ReplayButton from "../../buttons/interactions/ReplayButton";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";


function PostCard({ post, deep = 0 }: { post: PostType, deep?: number }) {



  const isReply = post.type === 'replay'
  const isRepost = post.type === 'repost' && !post.text && !post.media.length
  const isQuote = post.type === 'repost' && !!post.text && !!post.media.length
  const isNormal = post.type === 'post'
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/post/${post._id}`)} className={`${!isRepost && deep > 0 && "repost"} post cursor-pointer hover:bg-[#b2b2b21d] duration-100 `}>
      <PostHeader post={post} />
      {/*text  */}
      <div className={`grid ${!isRepost && "grid-cols-[min(32px,10%)_1fr]"}   gap-2`}>
        <div className=""></div>
        <div className="flex flex-col gap-2">
          <Typography variant="body2" >
            {post.text}
          </Typography>
          {/* media box */}
          {post.media && <MediaBox media={post.media} />}
          {/* Repost or Quote */}
          {(isQuote || isRepost) && deep == 0}
          {post.original_post && <PostCard post={post.original_post} deep={deep + 1} />}
        </div>
      </div>
      {/* interactions bar*/}
      {deep == 0 &&
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className="interactions-bar mt-2">
          <ReplayButton post_id={post._id} replies_count={post.statistics?.replies_count} />
          <RepostButton post_id={post._id} reposts_count={post.statistics?.reposts_count} />
          <LikeButton post_id={post._id} likes_count={post.statistics?.likes_count} isActive={post.isLike} />
          <BookmarkButton post_id={post._id} isActive={post.isBookmark} />
          <ShareButton post={post} />
        </div>
      }
    </div>
  )
}

export default PostCard