import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat } from "./schemas/chat.schema";

@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

    async saveMessage(message: string){
        const newMessage = new this.chatModel({message});
        return await newMessage.save();
    }

    async getMessages(limit: number = 10) {
        return await this.chatModel.find().sort({createdAt: -1}).limit(limit).exec();
    }
}