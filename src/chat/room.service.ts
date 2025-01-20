// import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/mongoose";
// import { Model } from "mongoose";
// import { Room } from "./schemas/room.schema";

// @Injectable()
// export class RoomService {
//     constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

//     //create a new room
//     async createRoom(title: string){
//         const newRoom = new this.roomModel({room_id: Math.random().toString(36).substring(2, 9), title});
//         return await newRoom.save();
//     }

//     //get all rooms
//     async getRooms(){
//         return await this.roomModel.find().exec();
//     }
// }