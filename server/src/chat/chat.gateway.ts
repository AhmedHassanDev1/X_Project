import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { RECEIVING_MESSAGE, SEND_MESSAGE, SEND_MESSAGE_NOTIFICATION } from "./chat.events";
import { SendMessageDTO } from "./dto/message.dto";
import { Inject, UsePipes, ValidationPipe } from "@nestjs/common";
import { Server, Socket } from 'socket.io';
import { MessageService } from "./service/message.service";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";


@WebSocketGateway({ namespace: "chat" })
export class ChatGateway {
    constructor(
        private readonly messageService: MessageService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,

    ) { }

    @WebSocketServer()
    server: Server;


    handleConnection(client: Socket) {
        const user_id = client.handshake.auth.id || client.handshake.query.user_id
        const socket_id = client.id
        this.cacheManager.set(user_id, socket_id);
    }

    handleDisconnect(client: Socket) {
        const user_id = client.handshake.auth.id || client.handshake.query.user_id
        this.cacheManager.del(user_id);
    }


    @SubscribeMessage(SEND_MESSAGE)
    async sendMessage(
        @MessageBody() body: SendMessageDTO,
        @ConnectedSocket() socket: Socket
    ) {
        try {
            const sender_id = socket.handshake.auth.id || socket.handshake.query.user_id
            const res = await this.messageService.createMessage({ ...body, sender_id })
            const msg = res?.msg
            const receivers = res?.receivers
        


            receivers?.forEach(async (el) => {
                const socketId = await this.cacheManager.get(el) as string
                this.server.to(socketId).emit(RECEIVING_MESSAGE, msg)
            })
         return msg
        } catch (error) {
            console.log(error); 

        }
    }
}