import { WebSocketGateway, WebSocketServer,SubscribeMessage, MessageBody,ConnectedSocket} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket,Server } from 'socket.io';
import logger from '@app/utils/logger';
import { SOCKET_SYNC__EVENT} from '@app/constants/sys.constant';
import { SOCKET_SYNC_MESSAGE } from '@app/interfaces/global.interface';

logger.scope('socket');

@WebSocketGateway({ cors: true })
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly socketService: SocketService
  ) {}

  afterInit(server: any) {
    logger.info('WebSocket server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    logger.info(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    logger.info(`Client disconnected: ${client.id}`);
  }

  // 广播事件
  broadcastMessage(event:string,message:SOCKET_SYNC_MESSAGE){
    this.server.emit(event,message);
  }


  // 简单确认信息示例
  @SubscribeMessage('socketTest')
  socketTest(@MessageBody() data: any) {
    logger.info('客户端发送的数据',data);
    return {
      socketTest:'hello word'
    }
  }


  // @SubscribeMessage('socketTest_Event')
  // socketTest_Event(@MessageBody() data: any) {
  //   logger.info('客户端发送的数据：' + JSON.stringify(data));
  //   return {
  //     event: 'socketTest2',
  //     data,
  //   };
  // }

  // 广播示例
  // @SubscribeMessage('socketTest_Broadcast')
  // socketTest_Broadcast(
  //   @MessageBody() data: any,
  //   @ConnectedSocket() clinet: Socket,
  // ) {
  //   clinet.broadcast.emit('broadcast-event', data);
  //   // console.log(clinet.broadcast,'--clinet--',clinet.broadcast.emit)
  //   // clinet.broadcast.emit('socketTest3', data);
  //   // this.server.emit('socketTest3',data);
  // }
}



