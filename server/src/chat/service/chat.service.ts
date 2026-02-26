import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Chat } from "src/schema/chat/chat.schema";
import { CreateConversationDto } from "../dto/chat.dto";


@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private readonly chatModel: Model<Chat>
    ) { }

    async createConversation(body: CreateConversationDto) {
        const { participants } = body
        const conversation = await this.chatModel.findOne({
            participants: { $all: participants },
            $expr: { $eq: [{ $size: "$participants" }, participants.length] }
        })
        if (conversation) return conversation
        return await this.chatModel.create({
            ...body,
            participants: participants
        })
    }

    async getChatById(userId: string, chatId: string) {
        let chat = await this.chatModel.findOne({ _id: chatId })
            .populate({
                path: "participants",
                match: { _id: { $ne: userId } },
                select: "_id name createdAt image",
                perDocumentLimit: 3
            })

        return chat
    }

    async getUserConversations(userId: string, cursor?: string | null, limit?: number | null) {
        limit = limit || 20
        let conversations = await this.chatModel.find({
            participants: { $in: userId }
        })
            .populate({
                path: "participants",
                match: { _id: { $ne: [userId] } },
                select: "_id name createdAt image",
                perDocumentLimit: 3
            }).populate({
                path: "lastMessageId",
                select: "sender_id text media"
            })
            .limit(limit + 1)
            .sort({ createdAt: -1 })

        return {
            conversations,
            hasNextPage: conversations.length > limit,
            endCursor: conversations.length > limit ? new Date(conversations[limit - 1]?.createdAt).toISOString() : null
        }
    }
}