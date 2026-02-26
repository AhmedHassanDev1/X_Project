import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
@WebSocketGateway({
  namespace: '/interactions',
  cors: {
    origin: '*',
  },
})
export class InteractionsGateway implements OnGatewayConnection {

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) { }

  @WebSocketServer() server;

  private users = new Map<string, string>();

  handleConnection(client) {
    const userId = client.handshake.auth?.userId || client.handshake.query?.userId;


    this.cacheManager.set(userId, client.id);

  }

  emitToAll(payload: any) {
    this.server.emit('interaction', payload);
  }

  async emitToUser(userId: string, payload: any) {
    const socketId = await this.cacheManager.get(userId);


    if (socketId) this.server.to(socketId).emit('interaction', payload);
  }

  @SubscribeMessage('ping')
  handlePing() {
    return 'pong';
  }
}
