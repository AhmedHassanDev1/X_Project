"use client"
import InfiniteScroll from "@/components/layout/InfiniteScroll";
import BackButton from "@/components/ui/buttons/routers/BackButton";
import SearchBar from "@/components/ui/inputs/SearchBar";
import Loading from "@/components/ui/loading/loading";
import PostsContainer from "@/components/ui/post/PostsContainer";
import { getUserPostsBookmarks } from "@/lib/api/graphql/posts.graphql";
import { PageInfo } from "@/types/post";
import { useQuery } from "@apollo/client/react";
import { Typography } from "@mui/material";


import { useEffect, useRef, useState, useTransition } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
function Page() {
 
  const [searchValue, setSearchValue] = useState<string|null>("");
  const [isPending, startTransition] = useTransition()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
     e.preventDefault()   
    const value = e.target.value;
    if(!value || value.trim().length==0 )return setSearchValue(null)
    
    e.target.focus()
    startTransition(() => {
      setSearchValue(value.trim());
    });
  };

  return (
    <section className="">
      {/* header */}
      <header className="header flex gap-7 items-center">
        <BackButton>
          <FaArrowLeftLong />
        </BackButton>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Bookmarks</Typography>
      </header>
      {/* search bar */}
      <div className="text-zinc-500 p-4">
        <SearchBar
          id="search-bookmarks"
           placeholder="Search Bookmarks"
          onChange={handleSearch}
        />
      </div>
      <ContentContainer searchValue={searchValue} />

    </section>

  )
}

export default Page

// content container
function ContentContainer({ searchValue }: { searchValue: string | null }) {
  const { data, fetchMore,  loading } = useQuery(getUserPostsBookmarks, {
    variables: {
      cursor: undefined,
      limit: 3,
      q: searchValue
    },

    fetchPolicy: "network-only",
    // notifyOnNetworkStatusChange: true
  })
  const posts = data?.posts.posts
  const pageInfo: PageInfo = data?.posts.pageInfo ?? {
    hasNextPage: false,
    endCursor: null,
  };
  
   
  if (loading && posts === undefined) {
    return <div className="w-full aspect-square grid place-content-center"><Loading /></div>
  }
  return (
    <InfiniteScroll
     pageInfo={pageInfo}
      posts={posts}
       cb={fetchMore} 
       loading={loading}
       
       >
      {(posts) => {
        return <PostsContainer posts={posts} />
      }}
    </InfiniteScroll>
  )
}