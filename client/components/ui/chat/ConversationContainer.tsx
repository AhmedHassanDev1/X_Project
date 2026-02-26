"use client"
import InfiniteScrollContainer from "@/components/layout/InfiniteScrollContainer"
import { useAuth } from "@/hooks/useAuth"
import { getconversations } from "@/lib/api/rest/chat"
import { getConversationsResponseType } from "@/types/chat"
import { Typography } from "@mui/material"
import { useInfiniteQuery, } from "@tanstack/react-query"
import ConversationCard from "./conversations/ConversationCard"
import ConversationLoading from "../loading/ConversationLoading"
import { BiMessageSquareAdd } from "react-icons/bi"
import { IoSettingsOutline } from "react-icons/io5"


function ConversationContainer() {

  const { user } = useAuth()
  const userId = user?._id

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<getConversationsResponseType>({
    queryKey: ["conversations", userId],
    queryFn: () => getconversations(),
    initialPageParam: null,
    enabled: !userId,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.endCursor : undefined
    }
  })
  const conversations = data?.pages.flatMap(el => el.conversations)



  return (
    <div className="seaction">
      <header className="header flex items-center justify-between">
        <Typography variant="h6">Chat</Typography>
        <div className="flex items-center gap-2 cursor-pointer ">
          <IoSettingsOutline size={22} />
          <BiMessageSquareAdd size={22} />
        </div>
      </header>
      <InfiniteScrollContainer
        fetchMore={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isloading={isLoading}
        endPosition={"bottom"}
      >
        {!isLoading ? conversations?.map(el => {
          return <ConversationCard
            key={el._id}
            conversation={el}
          />

        }) : Array(6).fill(null).map((_, ind, arr) => {
          return <div style={{
            opacity: Math.max(0, 0.2 * (arr.length - ind))
          }} key={ind}>
            <ConversationLoading />
          </div>
        })}
      </InfiniteScrollContainer>
    </div>
  )
}

export default ConversationContainer