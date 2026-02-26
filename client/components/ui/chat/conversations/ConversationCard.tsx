"use client"

import { ChatType } from "@/types/chat"
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type ConversationCardPropsType = {
  conversation: ChatType

}

function ConversationCard({ conversation }: ConversationCardPropsType) {

  const participants = conversation.participants
  const participantImage = participants[0].image.url
  const participantName = participants[0].name
  const lastMessage = conversation.lastMessageId //last message
  const lastMessageType = lastMessage.type || "text"
  const router = useRouter()
  const currentConversation = useParams().id as string
  const [isActive, setActive] = useState<boolean>(currentConversation == conversation._id)
  const handleClick = () => {
    setActive(true)
    router.push(`/i/chat/${conversation._id}`)
  }


  return (
    <div
      onClick={handleClick}
      className={`w-full h-24 flex gap-4 items-center p-2  cursor-pointer ${isActive ? "bg-zinc-800" : "bg-black"}`}>
      <div className="aspect-square grid place-content-center h-9/12 rounded-full overflow-hidden border-[0.5px] border-solid border-zinc-600">
        <Image
          src={participantImage}
          width={50}
          height={50}
          alt="participant image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2 flex-1 h-full py-2 border-solid border-transparent border-b-zinc-700 border-[1px]">
        <h5 className=" font-bold">{participantName}</h5>
        <p className=" text-zinc-400">{lastMessageType !== "text" ? `send ${lastMessageType}` : lastMessage.text}</p>
      </div>
    </div>
  )
}

export default ConversationCard