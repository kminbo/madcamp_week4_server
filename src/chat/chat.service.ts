// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import { Chat } from "./schemas/chat.schema";

// @Injectable()
// export class ChatService {
//     constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

//     //save a message to the database
//     async saveMessage(room_id: string, message: string){
//         const newMessage = new this.chatModel({room_id, message});
//         return await newMessage.save();
//     }

//     //get messages from a specific room
//     async getMessages(room_id: string, limit: number = 50) {
//         return await this.chatModel.find({room_id}).sort({createdAt: -1}).limit(limit).exec();
//     }
// }