"use client"

import { MessageContextType, MessageType } from "@/types/chat"

import { createContext, useState } from "react"
import TextInputMessage from "./TextInputMessage"

import VoiceRecording from "./VoiceRecording"
import useSocket from "@/hooks/useSocket"
import { SEND_MESSAGE } from "@/constants/socketEvents"
import { useQueryClient } from "@tanstack/react-query"
import MediaButton from "./buttons/MediaButton"
import { uploadFile } from "@/lib/api/rest/upload"



type SendMessageBarProps = {
  ChatId: string | null

}

const initialMessageContextValue: MessageContextType = {
  chatId: null,
  inputValue: null,
  recording: false,
  media: null,
  type: null,
  setInputValue: () => null,
  setRecording: () => null,
  setMedia: () => null,
  sendMassage: (message: Partial<MessageType>) => null,
  setType: () => null,
  insertInCache: () => null,
  reset: () => null
}

export const MessageContext = createContext<MessageContextType>(initialMessageContextValue)

function SendMessageBar({ ChatId }: SendMessageBarProps) {

  const chatSocket = useSocket("chat");
  const [inputValue, setInputValue] = useState<string | null>(null)
  const [recording, setRecording] = useState<boolean>(false)
  const [media, setMedia] = useState<File | null>(null)
  const [type, setType] = useState<"image" | "video" | "audio" | null>(null)
  const queryClient = useQueryClient();

  const insertInCache = (message: Partial<MessageType>) => {
    queryClient.setQueryData(["messages", ChatId], (oldData: any) => {
      return {
        ...oldData,
        pages: oldData?.pages?.map(page => ({
          ...page,
          messages: [...page.messages, { ...message, status: "pending" }]
        }))
      }
    });
  }

  const updateMessage = (tempId:string|undefined,res: MessageType) => {

      
    queryClient.setQueryData(["messages", ChatId], (oldData: any) => {
      return {
        ...oldData,
        pages: oldData?.pages?.map((page:Record<string,MessageType[]>) => ({
          ...page,
          messages: [...page.messages.map(el => el._id == tempId ? res : el)]
        }))
      }
    })
  }
  const reset = () => {
    setInputValue(null)
    setRecording(false)
    setMedia(null)
  }

  const sendMassage = async (message: Partial<MessageType>): void => {
    if (!chatSocket) return;
    if (media) {
      message.media = {
        url: URL.createObjectURL(media)
      }
    }
    insertInCache(message)

    const { _id, media: m, ...msg } = message
    if (media) {
      const file = media
   
      const res = await uploadFile(file, (res) => console.log(res))
      msg.media = {
        url: res.data.secure_url,
        public_id: res.data.public_id,
      }
      msg.type = res.data.resource_type
    }
    delete msg.status
    reset()
    chatSocket?.socket?.emit(SEND_MESSAGE, msg, (res: MessageType) => {
      const tempId=message._id

      updateMessage(tempId,res)

    })
  }

  const messageContextValue: MessageContextType = {
    chatId: ChatId,
    inputValue,
    recording,
    media,
    setInputValue,
    setRecording,
    setMedia,
    type: media ? media.type.startsWith("image/") ? "image" : media.type.startsWith("video/") ? "video" : null : null,
    setType,
    insertInCache,
    sendMassage,
    reset
  }

  return (
    <div className=" w-full grid grid-cols-[auto_1fr] gap-2 items-end z-50">
      <MessageContext.Provider value={messageContextValue} >
        {/* Your component that uses the MessageContext goes here */}
        {/* ------------------------------------------------------- */}
        {/* Media and gifs Buttons */}
        <MediaButton />
        {/* Text input and Audio input  */}
        {!recording ? <TextInputMessage /> : <VoiceRecording />}
      </MessageContext.Provider>
    </div>
  )
}

export default SendMessageBar