"use client"

import Loading from "@/components/ui/loading/loading"
import MediaContainer from "@/components/ui/post/MediaContainer"
import { getUserMedia } from "@/lib/api/graphql/posts.graphql"
import { useQuery } from "@apollo/client/react"
import { notFound, useParams } from "next/navigation"

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userId = useParams().id
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading } = useQuery(getUserMedia, {
    skip: !userId,
    variables: {
      userId
    },
  })

  const posts = data?.media.posts


  if (loading && posts === undefined) {
    return <div className="w-full aspect-square grid place-content-center"><Loading /></div>
  }

  if ((!posts || posts?.length === 0) && loading === false) {
    return notFound()
  }
  return (
    <>
      <MediaContainer media={posts} />
    </>

  )
}

export default page