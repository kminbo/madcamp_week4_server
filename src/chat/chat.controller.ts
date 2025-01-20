// import { Controller, Get, Post, Query, Body } from "@nestjs/common";
// import { ChatService } from "./chat.service"
// import { RoomService } from "./room.service"

// @Controller('chat')
// export class ChatController {
//     constructor(
//         private readonly chatService: ChatService,
//         private readonly roomService: RoomService
//     ) {}

//     //get messages from a specific room
//     @Get('messages')
//     async getMessages(@Query('room_id') room_id: string, @Query('limit') limit: number = 50){
//         if (!room_id) {
//             return {status: 'error', message: 'Room ID is required'};
//         }
//         const messages = await this.chatService.getMessages(room_id, limit);
//         return {status: 'success', room_id, messages};
//     }

//     //create a new room
//     @Post('room')
//     async createRoom(@Body('title') title: string){
//         if (!title) {
//             return {status: 'error', message: 'Title is required'};
//         }
//         const room = await this.roomService.createRoom(title);
//         return {status: 'success', message: 'Room created successfully', room};
//     }
// }