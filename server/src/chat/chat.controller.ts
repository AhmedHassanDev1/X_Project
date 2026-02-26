import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { MessageService } from "./service/message.service";
import { ChatService } from "./service/chat.service";
import { CreateConversationDto } from "./dto/chat.dto";
import { CurrentUser } from "src/shared/decorator/currentUser.decorator";
import { MongoIdValidationPipe } from "src/shared/pipe/mongoID.pipe";


@Controller("/chat")
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly messageService: MessageService
    ) { }


    @Post("/init")
    async CreateNewChat(
        @Body() body: CreateConversationDto
    ) {
        return await this.chatService.createConversation(body)
    }

    @Get("/conversations")
    async getUserConversations(
        @CurrentUser("_id") userId: string,
        @Query("limit") limit: number = 10,
        @Query("cursor") cursor: string | undefined,
    ) {
        return await this.chatService.getUserConversations(userId, cursor, limit)
    }

    @Get("/:chat_id")
    async getChatInfo(
        @CurrentUser("_id") userId: string,
        @Param("chat_id", MongoIdValidationPipe) chatId: string
    ) {

        return await this.chatService.getChatById(userId, chatId)
    }



    @Get("/:chat_id/messages")
    async getChatMessages(
        @CurrentUser("_id") userId: string,
        @Param("chat_id", MongoIdValidationPipe) chatId: string,
        @Query("limit") limit: number = 10,
        @Query("cursor") cursor: string | undefined,
    ) {
        return await this.messageService.getChatMessages(userId, chatId, cursor, limit)
    }
}