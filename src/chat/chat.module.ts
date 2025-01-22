import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "./schemas/chat.schema";
import { ChatController } from "./chat.controller";
import { RoomSchema } from "./schemas/room.schema";
import { Room } from "./schemas/room.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Chat.name, schema: ChatSchema}]), MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}])],
    providers: [ChatGateway, ChatService],
    controllers: [ChatController],
})
export class ChatModule {}