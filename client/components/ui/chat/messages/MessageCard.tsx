"use client"

import { MessageType } from "@/types/chat"
import TextMessage from "./TextMessage"
import ImageMessage from "./ImageMessage"
import VideoMessage from "./videoMessage"

type MessageCardProps = {
  message: MessageType
}
function MessageCard({ message }: MessageCardProps) {


  switch (message.type) {

    case "image":
      return <ImageMessage message={message} />
    case "video":
      return <VideoMessage message={message} />
    default:
      return <TextMessage message={message} />
  }

}

export default MessageCard