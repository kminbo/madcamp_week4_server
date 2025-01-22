import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat } from "./schemas/chat.schema";
import { Room } from "./schemas/room.schema";

@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>,
        @InjectModel(Room.name) private roomModel: Model<Room>) {}

    //create a new room
    async createRoom(title: string) {
        const newRoom = new this.roomModel({
            room_id: Math.random().toString(36).substring(2, 9),
            title
        });
        return await newRoom.save();
    }

    //get all rooms
    async getRooms(){
        return await this.roomModel.find().exec();
    }

    //get messages from a specific room
    async getMessages(room_id: string){
        return await this.chatModel.find({room_id}).sort({created_at: -1}).limit(50).exec();
    }
    
    //save a message in a room
    async saveMessage(room_id: string, sender_id: string, message: string){
        const newMessage = new this.chatModel({room_id, sender_id, message});
        return await newMessage.save();
    }

    //check if a room exists
    async checkRoomExists(room_id: string){
        const room = await this.roomModel.findOne({room_id});
        return !!room;
    }
}