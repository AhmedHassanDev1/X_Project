"use client"
import Loading from "@/components/ui/loading/loading"
import PostsContainer from "@/components/ui/post/PostsContainer"
import { getUserPostsLike } from "@/lib/api/graphql/posts.graphql"
import { useQuery } from "@apollo/client/react"
import { notFound, useParams } from "next/navigation"

function Page() {
  const userId = useParams().id
  const { data, loading } = useQuery(getUserPostsLike, {
    skip: !userId,
    variables: {
      userId
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only"
  })

  const posts = data?.posts.posts
  if (loading && posts === undefined) {
    return <div className="w-full aspect-square grid place-content-center"><Loading /></div>

  }

  if (posts?.length === 0 && loading === false) {
    notFound()
  }

  return (
    <div>
      <PostsContainer posts={posts} />
    </div>
  )
}

export default Page