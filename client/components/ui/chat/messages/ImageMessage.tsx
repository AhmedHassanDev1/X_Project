"use client"

import { MessageType } from "@/types/chat"
import { useContext,   } from "react"
import { MessageContext } from "../sendMessageBar/SendMessageBar"
import Image from "next/image"

import { useAuth } from "@/hooks/useAuth"


function ImageMessage({ message }: { message: MessageType }) {
  const { setMedia, setType, media, } = useContext(MessageContext)
   const { user } = useAuth()
 

  return (
    <div className="message-wrapper relative z-0">
      <div className={`relative ${user?._id === message.sender_id ? "sendered-message" : "received-message"} p-[0.5px] dark:bg-zinc-800 bg-gray-100  h-fit message border-2 border-zinc-700 border-solid overflow-hidden`}>
       
        {message.media?.url && <div className=" ">
          <Image
            src={message.media?.url}
            width={200}
            height={150}
            alt="image-message"
          />
        </div>}
      </div>
    </div>
  )
}

export default ImageMessage