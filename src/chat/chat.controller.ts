import { Controller, Get, Post, Query, Body } from "@nestjs/common";
import { ChatService } from "./chat.service"

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) {}
    
    //create a new room
    @Post('room')
    async createRoom(@Body('title') title: string){
        if (!title){
            return {status: 'error', message: 'Title is required'};
        }
        const room = await this.chatService.createRoom(title);
        return {status: 'success', message: 'Room created successfully', room};
    }

    //get all chat rooms
    @Get('rooms')
    async getRooms(){
        const rooms = await this.chatService.getRooms();
        return {status: 'success', rooms};
    }

    //get messages from a specific room
    @Get('messages')
    async getMessages(@Query('room_id') room_id: string){
        if (!room_id){
            return {status: 'error', message: 'Room ID is required'};
        }
        const messages = await this.chatService.getMessages(room_id);
        return {
            status: 'success', 
            room_id, 
            messages: messages.map(msg => ({
                room_id: msg.room_id,
                sender_id: msg.sender_id,
                message: msg.message,
                created_at: msg.created_at,
            })),
        };
    }

    @Get('recents')
    async getLatestMessages(@Query('room_id') room_id: string){
        if (!room_id){
            return {status: 'error', message: 'Room ID is required'};
        }
        const latestMessages = await this.chatService.getLatestMessages(room_id);
        return {status: 'success', message: latestMessages.message};
    }


}