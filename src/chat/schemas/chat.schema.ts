import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Chat{
    @Prop({required: true})
    room_id: string;

    @Prop({required: true})
    message: string;

    @Prop({default: Date.now})
    createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);