import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { ChatService } from "./chat.service";


@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private logger = new Logger(ChatGateway.name);

    constructor(private readonly chatService: ChatService) {}

    //socket.id 와 user_id 매핑
    private userSockets : Map<string, string> = new Map();
    
    @WebSocketServer() //websocket server instance
    server: Server;

    //handle connection event - when a client connects to the server
    handleConnection(client: Socket){
        this.logger.log(`Client connected: ${client.id}`);
    }

    //handle disconnection event - when a client disconnects from the server
    handleDisconnect(client: Socket){
        const userId = this.userSockets.get(client.id);
        this.userSockets.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id} (user_id: ${userId})`);
    }

    @SubscribeMessage('authenticate')
    async handleAuthenticate(client: Socket, user_id: string){
        this.userSockets.set(client.id, user_id);
        this.logger.log(`Client authenticated: ${client.id} (user_id: ${user_id})`);
    }

    //User joins a specific room
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(client: Socket, room_id: string){
        //room_id가 데이터베이스에 존재하는지 확인
        const roomExists = await this.chatService.checkRoomExists(room_id);
        if(!roomExists){
            this.logger.error(`Room ${room_id} does not exist`);
            client.emit('error', {message: 'Room does not exist'});
            return;
        }
        client.join(room_id);
        this.logger.log(`Client ${client.id} joined room: ${room_id}`);
    }

    //handle message event - when a client sends a message to the server
    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: {room_id: string, message: string}){
        if(typeof payload === 'string'){
            try{
                payload = JSON.parse(payload);
            }catch(error){
                this.logger.error('Invalid message payload: Failed to parse JSON', error);
                return;
            }
        }

        if (!payload.room_id || !payload.message) {
            this.logger.error('Invalid message payload: Missing room_id or message');
            return;
        }

        const senderId = this.userSockets.get(client.id); // Retrieve user_id from socket.id
        if (!senderId) {
          this.logger.error("Unauthenticated client tried to send a message");
          return;
        }

        this.logger.log(`Received message in room ${payload.room_id}: ${payload.message}`);

        //save the message to the database
        await this.chatService.saveMessage(payload.room_id, senderId, payload.message);

        this.logger.log(`Broadcasting message to room ${payload.room_id}: ${payload.message}`);

        //broadcast the message to all connected clients in the room
        client.to(payload.room_id).emit('message', {
            room_id: payload.room_id, 
            sender_id: senderId, 
            message: payload.message, 
            created_at: new Date().toISOString()
        });

        this.logger.log(`Message broadcasted to room ${payload.room_id}: ${payload.message}`);
    }
}