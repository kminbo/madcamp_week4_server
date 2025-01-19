import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../auth/schemas/user.schema';

@Schema()
export class Schedule {
    @Prop({ default: uuidv4, unique: true }) //UUID 자동 생성
    schedule_id: string;

    // @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    @Prop({ ref: 'User', required: true })
    user_id: string;

    @Prop({ required: true })
    situation: string;

    @Prop({ required: true })
    due: Date;

    @Prop()
    tasks: string;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);