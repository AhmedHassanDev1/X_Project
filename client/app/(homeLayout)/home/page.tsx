"use client"
import InfiniteScroll from "@/components/layout/InfiniteScroll"
import Loading from "@/components/ui/loading/loading"
import CreatePost from "@/components/ui/post/CreatePost"
import CreatePostButton from "@/components/ui/post/CreatePost/CreatePostButton"
import EmojiButton from "@/components/ui/post/CreatePost/EmojiButton"
import MediaButton from "@/components/ui/post/CreatePost/MediaButton"
import PreViewMedia from "@/components/ui/post/CreatePost/PreViewMedia"
import ProgressBarsContainer from "@/components/ui/post/CreatePost/ProgressBarsContainer"
import TextInput from "@/components/ui/post/CreatePost/TextInput"
import PostsContainer from "@/components/ui/post/PostsContainer"
import CurrentUserImg from "@/components/ui/user/CurrentUserImg"
import { getHomePostsQuery } from "@/lib/api/graphql/posts.graphql"
import { PageInfo } from "@/types/post"
import { useQuery } from "@apollo/client/react"


function page() {
  return (
    <div>
      <CreatePost >
        {({inputRef}) => {
          return <>
            <div className="flex gap-2 p-3">
              <CurrentUserImg />
              <div className="flex-1 space-y-3">
                <TextInput ref={inputRef} />
                <PreViewMedia />
                <ProgressBarsContainer />
                <hr className=" text-zinc-600" />
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-2">
                    <MediaButton />
                    <EmojiButton />
                  </div>
                  <CreatePostButton />
                </div>
              </div>
            </div>
            <hr className=" text-zinc-600" />
          </>
        }}
      </CreatePost>
      <HomeConent />
    </div>
  )
}

export default page

function HomeConent() {
  const { data, loading, fetchMore } = useQuery(getHomePostsQuery, {
    variables: {
      cursor: undefined,
      limit: 3
    },
  })


  const posts = data?.posts.posts
  const pageInfo: PageInfo = data?.posts.pageInfo ?? {
    hasNextPage: false,
    endCursor: null,
  };
  if (loading && posts === undefined) {
    return <div className="w-full aspect-square grid place-content-center"><Loading /></div>
  }

  if (posts?.length === 0 && loading === false) {
    return (
      <div className="flex flex-col items-center justify-center p-10 ">
        <div className="not-found-title">No posts yet</div>
        <div className="not-found-subtitle">You should follow some accounts to receive suggested posts.</div>
      </div>
    )
  }

  return (
    <div>
      <InfiniteScroll pageInfo={pageInfo} posts={posts} cb={fetchMore} loading={loading} >
        {(posts) => {
          return <PostsContainer posts={posts} />
        }}
      </InfiniteScroll>
    </div>
  )
}