import { PageInfo, PostType } from '@/types/post'
import PostCard from './PostCard/PostCard'
import InfiniteScroll from '@/components/layout/InfiniteScroll'

type PostsContainerProps = {
  posts: PostType[] | undefined

}

function PostsContainer({ posts, }: PostsContainerProps) {
  

  return (
    <section className=' divide-y-2 divide-zinc-700'>
      {posts?.map((post) => <PostCard key={post._id} post={post} />)}
    </section>
  )
}

export default PostsContainer