// import { Controller, Get, Post, Body } from "@nestjs/common";
// import { RoomService } from "./room.service";

// @Controller('room')
// export class RoomController {
//     constructor(private readonly roomService: RoomService) {}

//     @Post()
//     async createRoom(@Body('title') title: string){
//         return await this.roomService.createRoom(title);
//     }

//     @Get()
//     async getRooms(){
//         return await this.roomService.getRooms();
//     }
// }