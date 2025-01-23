import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HomeActivities } from './schemas/home-activity.schema';
import { User } from '../auth/schemas/user.schema';
import { CreateHomeActivityDto } from './dto/create-activity.dto';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class HomeActivitiesService {
    constructor(
        @InjectModel(HomeActivities.name) private homeActivitiesModel: Model<HomeActivities>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    private logger = new Logger(HomeActivitiesService.name);

    async createHomeActivity(createHomeActivityDto: CreateHomeActivityDto) {
        this.logger.log('createHomeActivity 함수 호출');

        const {user_id, activity} = createHomeActivityDto;
        this.logger.log(`user_id: ${user_id}, activity: ${activity}`);

        const user = await this.userModel.findOne({user_id});
        if(!user) {
            this.logger.error('User not found');
            throw new NotFoundException('User not found');
        }
        this.logger.log(`user: ${user}`);

        const createdHomeActivity = new this.homeActivitiesModel({
            activity_id: uuidv4(),
            user_id, 
            activity});

        const savedHomeActivity = await createdHomeActivity.save();

        this.logger.log(`savedHomeActivity: ${savedHomeActivity}`);

        return {status: 'success', message: 'Home activity created successfully'};
    }

    async getHomeActivities(userId: string) {
        this.logger.log('getHomeActivities 함수 호출');
        this.logger.log(`user_id: ${userId}`);

        const homeActivities = await this.homeActivitiesModel.find({user_id: userId}).exec();

        if(!homeActivities || homeActivities.length === 0) {
            throw new NotFoundException(`No home activities found for user_id: ${userId}`);
        }

        return {status: 'success', activities: homeActivities.map(a => ({
            activity_id: a.activity_id,
            activity: a.activity
        }))};
    }

    async deleteHomeActivity(activityId: string) {
        const result = await this.homeActivitiesModel.deleteOne({activity_id: activityId}).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`No home activity found for activity_id: ${activityId}`);
        }
        this.logger.log(`home activity deleted successfully: ${activityId}`);
        return {status: 'success', message: 'Home activity deleted successfully'};
    }
}