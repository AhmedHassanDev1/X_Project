import { MediaType } from "./interactions"


export type Participant = {
   _id: string
   name: string
   image: {
      url: string
   }
   createdAt: string
}



export type MessageType = {
   _id: string
   chat_id: string
   sender_id: string
   text?: string | null
   type?: "image" | "video" | "audio" | null
   media?: {
      url: string
      public_id: string
   }
   status: "send" | "pending" | "failed"
   createdAt: string
}

export type ChatType = {
   _id: string
   participants: Participant[]
   type: string
   status: string
   createdAt: string
   lastMessageId:  MessageType
   lastMessageAt: string
}

export type MessageContextType = {
   chatId: string | null
   type: "image" | "video" | "audio" | null
   inputValue: string | null
   recording: boolean
   media: File | null
   setInputValue: (value: string | null) => void
   setRecording: (value: boolean) => void
   setMedia: (file: File | null) => void
   sendMassage: (message: Partial<MessageType>) => void
   setType: (type: "image" | "video" | "audio" | null) => void
   insertInCache: (message: Partial<MessageType>) => void
   reset: () => void
}

export type getMessagesResponseType = {
   messages: MessageType[]
   hasNextPage: boolean
   endCursor: number | null
}

export type getConversationsResponseType = {
   conversations: ChatType[]
   hasNextPage: boolean
   endCursor: number | null
}