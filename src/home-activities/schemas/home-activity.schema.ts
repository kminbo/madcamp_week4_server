import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class HomeActivities {
    @Prop({default: uuidv4(), unique: true})  //UUID 생성
    acitivity_id: string;

    @Prop({ ref: 'User', required: true})
    user_id: string;

    @Prop({required: true})
    activity: string;
}

export const HomeActivitiesSchema = SchemaFactory.createForClass(HomeActivities);