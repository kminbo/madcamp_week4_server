// import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
// import { Server, Socket } from "socket.io";
// import { Logger } from "@nestjs/common";
// import { ChatService } from "./chat.service";

// @WebSocketGateway({cors: true})
// export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//     private logger = new Logger(ChatGateway.name);

//     constructor(private readonly chatService: ChatService) {}
    
//     @WebSocketServer() //websocket server instance
//     server: Server;

//     //handle connection event - when a client connects to the server
//     handleConnection(client: Socket){
//         this.logger.log(`Client connected: ${client.id}`);
//     }

//     //handle disconnection event - when a client disconnects from the server
//     handleDisconnect(client: Socket){
//         this.logger.log(`Client disconnected: ${client.id}`);
//     }

//     //User joins a specific room
//     @SubscribeMessage('joinRoom')
//     async handleJoinRoom(client: Socket, roomId: string){
//         client.join(roomId);
//         this.logger.log(`Client ${client.id} joined room: ${roomId}`);
//     }

//     //handle message event - when a client sends a message to the server
//     @SubscribeMessage('message')
//     async handleMessage(client: Socket, payload: {room_id: string, message: string}){
//         if (!payload.room_id || !payload.message) {
//             this.logger.error('Invalid message payload: Missing room_id or message');
//             return;
//         }

//         this.logger.log(`Received message in room ${payload.room_id}: ${payload.message}`);

//         //save the message to the database
//         await this.chatService.saveMessage(payload.room_id, payload.message);

//         //broadcast the message to all connected clients in the room
//         this.server.to(payload.room_id).emit('message', {room_id: payload.room_id, message: payload.message});
//     }
// }