import { Module } from "@nestjs/common"
import { ChatController } from "./chat.controller";
import { MessageService } from "./service/message.service";
import { ChatService } from "./service/chat.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "src/schema/chat/chat.schema";
import { Message, MessageSchema } from "src/schema/chat/message.schema";
import { ChatGateway } from "./chat.gateway";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Chat.name,
            schema: ChatSchema
        }, {
            name: Message.name,
            schema: MessageSchema
        }]),
        CacheModule.register()
    ],
    providers: [ChatService, MessageService,ChatGateway],
    controllers: [ChatController]
})
export class ChatModule { }