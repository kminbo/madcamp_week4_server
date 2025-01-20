import { Controller, Get, Query } from "@nestjs/common";
import { ChatService } from "./chat.service"

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('messages')
    async getMessages(@Query('limit') limit: number = 50){
        return await this.chatService.getMessages(limit);
    }
}