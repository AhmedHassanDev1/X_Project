"use client"
import InfiniteScroll from "@/components/layout/InfiniteScroll"
import Loading from "@/components/ui/loading/loading"
import PostsContainer from "@/components/ui/post/PostsContainer"
import { getUserPosts } from "@/lib/api/graphql/posts.graphql"
import { PageInfo } from "@/types/post"
import { useQuery } from "@apollo/client/react"
import { notFound, useParams } from "next/navigation"

function Page() {
  const userId = useParams().id
  const { data, loading, fetchMore } = useQuery(getUserPosts, {
    skip: !userId,
    variables: {
      userId,
      cursor: undefined,
      limit:3
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
    notFound()
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

export default Page