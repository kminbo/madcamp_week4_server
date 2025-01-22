import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Chat{
    @Prop({required: true})
    room_id: string;

    @Prop({required: true})
    sender_id: string;  //user_id

    @Prop({required: true})
    message: string;

    @Prop({default: Date.now})
    created_at: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);