"use client"

import MessagesContainer from "@/components/ui/chat/MessagesContainer"
import Loading from "@/components/ui/loading/loading"
import { getChatById } from "@/lib/api/rest/chat"
import { ChatType } from "@/types/chat"
import { birthDateFormatter } from "@/utils/formater/date"
import {  Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useRef } from "react"

function Page() {
  const chatId = useParams().id as string
  const chatPageRef = useRef<HTMLDivElement | null>(null)
  const { data, isLoading } = useQuery({
    queryFn: () => getChatById(chatId),
    queryKey: ["chat", chatId],
    enabled: !!chatId
  })

  const chat = data?.data as ChatType
  const chatName = chat?.participants[0]?.name || "/default-profile.jpg "
  const chatImage = chat?.participants[0].image?.url || "/default-profile.jpg"
 

  if (isLoading) {
    return <Loading />
  }
  return (
    <div ref={chatPageRef} className="chat min-h-screen  pt-0 flex flex-col gap-5 overflow-y-auto">
      <header className="header h-min flex gap-3 items-center">
        <div className=" rounded-3xl overflow-hidden">
          <Image 
          width={40} 
          height={40} 
          alt="chat avatar" 
          src={chatImage}
           className="rounded-3xl object-cover w-12 h-12" />
        </div>

        <Typography variant="h5">{chatName}</Typography>
      </header>
      <section className="flex flex-col gap-2 items-center">
        <Image width={50} height={50} alt="chat avatar" src={chatImage} className="w-14 h-14 rounded-3xl object-cover" />
        <Typography variant="h5">{chatName}</Typography>
        <Typography variant="body1" sx={{ color: "gray" }}>@{chatName}</Typography>
        <Typography variant="body1" sx={{ color: "gray" }}>{birthDateFormatter(chat?.participants[0].createdAt)}</Typography>
        <Link href={`/${chat?.participants[0]._id}`} className="primary-btn my-3">view profile</Link>
      </section>
      <MessagesContainer chatRef={chatPageRef} />
    </div>
  )
}

export default Page