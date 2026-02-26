"use client"


import Loading from "@/components/ui/loading/loading"
import PostCard from "@/components/ui/post/PostCard/PostCard"
import { getPostById } from "@/lib/api/graphql/posts.graphql"
import { useQuery } from "@apollo/client/react"
import { useParams } from "next/navigation"

function Page() {
  const postId = useParams()?.id as string
  console.log(postId);

  const { data, loading ,error} = useQuery(getPostById, {
    variables: {
      id: postId,
    },
    skip: !postId
  })

  const post = data?.post
  
  
  

  if (loading) {
    return <div className="">
      <Loading />
    </div>
  }
  return (
    <section className="">
      {post&&<PostCard post={post} />}
    </section>
  )
}

export default Page