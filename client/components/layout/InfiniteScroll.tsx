"use client"

import { PageInfo, PostType, GetPostsQueryVariables, getMediaQueryType } from '@/types/post';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from '../ui/loading/loading';
type InfiniteScrollProps = {
    children: (posts: PostType[]) => React.ReactNode
    pageInfo: PageInfo
    posts: PostType[] | undefined
    cb: ({ cursor }: { cursor: string | null }) => Promise<unknown>
    loading: boolean

}

function InfiniteScroll({ children, pageInfo, posts, cb, loading }: InfiniteScrollProps,) {
    const [{ endCursor, hasNextPage }, setSPageInfo] = useState(pageInfo)

    const loadMore = async (inView: boolean) => {

        if (!hasNextPage || !endCursor || !inView || loading) return

        try {
            await cb({
                variables: {
                    cursor: endCursor,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    setSPageInfo(fetchMoreResult.posts.pageInfo)
                    console.log(fetchMoreResult);

                    return {
                        posts: {
                            posts: [...prev.posts.posts, ...fetchMoreResult.posts.posts],
                            pageInfo: fetchMoreResult.posts.pageInfo,
                        },
                    };
                },
            });
        } catch (error) {
            console.log(error);

        }

    }
    const { ref } = useInView({
        threshold: 0,
        rootMargin: "200px",
        onChange: loadMore
    })


    return (
        <div >
            {children(posts || [])}
            {loading && <div className="p-5"><Loading /></div>}
            <div className="h-4" ref={ref}></div>

        </div>
    )
}

export default InfiniteScroll