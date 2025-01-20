import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";
import { ChatService } from "./chat.service";

@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private logger = new Logger(ChatGateway.name);

    constructor(private readonly chatService: ChatService) {}
    
    @WebSocketServer() //websocket server instance
    server: Server;

    //handle connection event - when a client connects to the server
    handleConnection(client: Socket){
        this.logger.log(`Client connected: ${client.id}`);
    }

    //handle disconnection event - when a client disconnects from the server
    handleDisconnect(client: Socket){
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    //handle message event - when a client sends a message to the server
    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: {message: string}){
        //check if the payload is a string and parse it into an object
        if (typeof payload === 'string') {
            try{
                payload = JSON.parse(payload);
            } catch (error) {
                this.logger.error('Failed to parse message payload as JSON:', error);
                return; //exit if parsing fails
            }
        }

        this.logger.log('Parsed payload:', JSON.stringify(payload));

        //check if the payload contains a message
        if (payload.message) {
            this.logger.log(`Received message: ${payload.message}`);

            //save the message to the database
            await this.chatService.saveMessage(payload.message);

            //broadcast the message to all connected clients
            this.server.emit('message', { message: payload.message });
        } else {
            this.logger.error('Message not found in payload');
        }
    }
}