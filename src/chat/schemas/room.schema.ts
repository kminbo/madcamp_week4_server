import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema()
export class Room{
    @Prop({required: true, unique: true})
    room_id: string;

    @Prop({required: true})
    title: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);