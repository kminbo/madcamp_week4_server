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
        await createdSchedule.save();

        return {status: 'success', message: 'Schedule created successfully', schedule: createdSchedule};
    }

    async getSchedules(userId: string) {
        this.logger.log('getSchedule 함수 호출');
        this.logger.log(`user_id: ${userId}`);

        const schedules = await this.scheduleModel.find({user_id: userId}).exec();
        if (!schedules || schedules.length === 0) {
            throw new NotFoundException(`No schedules found for user_id: ${userId}`);
        }

        return {status: 'success', schedules};
    }

    async getSituations(userId: string) {
        this.logger.log('getSchedule 함수 호출');
        this.logger.log(`user_id: ${userId}`);

        const schedules = await this.scheduleModel.find({user_id: userId}, 'situation');
        if (!schedules || schedules.length === 0) {
            throw new NotFoundException(`No situations found for user_id: ${userId}`);
        }

        const situations = schedules.map(schedule => schedule.situation);
        this.logger.log(`situations: ${schedules}`);

        return {status: 'success', situations};
    }

    async getScheduleDetail(scheduleId: string) {
        this.logger.log('getScheduleDetail 함수 호출');
        this.logger.log(`schedule_id: ${scheduleId}`);

        const schedule = await this.scheduleModel.findOne({schedule_id: scheduleId}).exec();
        if (!schedule) {
            throw new NotFoundException(`No schedule found for schedule_id: ${scheduleId}`);
        }

        return {status: 'success', schedule};
    }

    async deleteSchedule(scheduleId: string) {
        this.logger.log(`deleteSchedule 함수 호출`);
        this.logger.log(`schedule_id: ${scheduleId}`);

        const result = await this.scheduleModel.deleteOne({schedule_id: scheduleId}).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`No schedule found for schedule_id: ${scheduleId}`);
        }
        this.logger.log(`schedule deleted successfully: ${scheduleId}`);
        return {status: 'success', message: 'Schedule deleted successfully'};
    }
}