"use client"

import { useParams } from "next/navigation"
import SendMessageBar from "./sendMessageBar/SendMessageBar"
import InfiniteScrollContainer from "@/components/layout/InfiniteScrollContainer"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { getMesages } from "@/lib/api/rest/chat"
import { getMessagesResponseType, MessageType } from "@/types/chat"
import MessageCard from "./messages/MessageCard"
import { RefObject, useEffect, } from "react"
import useSocket from "@/hooks/useSocket"
import { RECEIVING_MESSAGE } from "@/constants/socketEvents"


function MessagesContainer({ chatRef }: { chatRef: RefObject<HTMLDivElement | null> | null }) {
    const chatSocket = useSocket("chat");
    const queryClient = useQueryClient();

    const chatId = useParams().id as string
    const { data, isFetchingNextPage, isLoading, fetchNextPage } = useInfiniteQuery<getMessagesResponseType>({
        queryKey: ["messages", chatId],
        queryFn: () => getMesages(chatId),
        initialPageParam: null,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage ? lastPage.endCursor : undefined
        }
    })

    const messages = data?.pages.flatMap(page => page.messages) || []
    useEffect(() => {
  const socket = chatSocket?.socket;
  if (!socket) return;
   
    if (chatRef?.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

  const handler = (msg: MessageType) => {
    console.log("Received message:", msg);

    queryClient.setQueryData(["messages", chatId], (oldData: any) => {
      if (!oldData) return oldData;
      
      const pages = [...oldData.pages];
      const lastPageIndex = pages.length - 1;
      const lastPage = pages[lastPageIndex];

   
      const alreadyExists = lastPage.messages.some(m => m._id === msg._id);
      if (alreadyExists) return oldData;

      pages[lastPageIndex] = {
        ...lastPage,
        messages: [...lastPage.messages, { ...msg, status: "pending" }]
      };

      return { ...oldData, pages };
    });


    if (chatRef?.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  socket.on(RECEIVING_MESSAGE, handler);

  return () => {
    socket.off(RECEIVING_MESSAGE, handler);
  };
}, [chatSocket?.socket, chatId, chatRef]);

    const GroupMessagesByCreatedAt = (messages: MessageType[]): Record<string, MessageType[]> => {
        return messages.reduce((groups: Record<string, MessageType[]>, msg) => {
            const createdAt = msg.createdAt

            const date = new Date(createdAt);
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString(undefined, options);

            if (!groups[formattedDate]) {
                groups[formattedDate] = []
            }
            groups[formattedDate].push(msg)
            return groups
        }, {})
    }


    return (
        <section className="flex-1 flex flex-col  relative  items-end px-4">
            <div className="w-full flex-1">
                <InfiniteScrollContainer
                    endPosition="top"
                    fetchMore={fetchNextPage}
                    isloading={isLoading}
                    isFetchingNextPage={isFetchingNextPage}>
                    <div className="w-full h-full ">
                        {Object.entries(GroupMessagesByCreatedAt(messages)).map(([date, messages]) => {
                            return <div key={date}>
                                <p className="text-sm font-bold text-zinc-500 text-center">{date}</p>
                                {messages.map(el => <MessageCard key={el._id} message={el} />)}
                            </div>
                        })
                        }
                    </div>
                </InfiniteScrollContainer>
            </div>
            <div className="w-full sticky bottom-0 px-2 py-5 bg-linear-0 from-50% dark:from-black from-white to-100% to-transparent ">
                <SendMessageBar ChatId={chatId} />
            </div>
        </section>
    )
}

export default MessagesContainer