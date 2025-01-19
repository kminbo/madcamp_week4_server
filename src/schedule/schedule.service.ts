import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from './schemas/schedule.schema';
import { User } from '../auth/schemas/user.schema';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    private logger = new Logger(ScheduleService.name);

    async createSchedule(createScheduleDto: CreateScheduleDto) {
        this.logger.log('createSchedule 함수 호출');

        const {user_id} = createScheduleDto;
        this.logger.log(`user_id: ${user_id}`);

        //사용자 확인
        const user = await this.userModel.findOne({user_id});
        this.logger.log(`user: ${user}`);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        //스케줄 생성
        const createdSchedule = new this.scheduleModel({
            schedule_id: uuidv4(),
            ...createScheduleDto,
        });
        return await createdSchedule.save();
    }
}