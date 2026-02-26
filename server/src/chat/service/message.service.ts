import { Injectable } from "@nestjs/common";
import { senderType, SendMessageDTO } from "../dto/message.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Message } from "src/schema/chat/message.schema";
import { Chat } from "src/schema/chat/chat.schema";


@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    ) { }

    async createMessage(message: SendMessageDTO & senderType) {
     
        
        try {
            const { chat_id, sender_id } = message
            const msg = await this.messageModel.create(message)
            const createdAt = (msg as any).createdAt || new Date()
            const chat = await this.chatModel.findByIdAndUpdate(
                { _id: chat_id },
                { lastMessageAt: createdAt, lastMessageId: msg._id })
            const receivers = chat?.participants.map(String).filter(el => el != sender_id)
            let {_id,text,media,status,type,}=msg
            return { receivers, msg:{_id,text,createdAt,media,status,type,chat_id,sender_id} }
        } catch (error) {
            console.log(error);
        }
    }

    async getChatMessages(userId: string, ChatId: string, cursor?: string | undefined, limit?: number) {
        let query = {}
        limit = limit || 20
        if (cursor) {
            query = {
                chat_id: ChatId,
                createdAt: { $lt: cursor }
            }
        } else {
            query = {
                chat_id: ChatId,
            }
        }
        const messages = await this.messageModel
            .find(query)
            .limit(limit+1)
            .sort({ createdAt: 1 })
        return {
            messages,
            hasNextPage: messages.length > limit,
            endCursor: messages.length > limit ? new Date(messages[limit-1]?.createdAt).toISOString() : null
        }
    }
}