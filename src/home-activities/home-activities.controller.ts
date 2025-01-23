import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { HomeActivitiesService } from './home-activities.service';
import { CreateHomeActivityDto } from './dto/create-activity.dto';

@Controller('home-activities')
export class HomeActivitiesController {
  constructor(private readonly homeActivitiesService: HomeActivitiesService) {}

  @Post()
  async createHomeActivity(@Body() createHomeActivityDto: CreateHomeActivityDto) {
    return await this.homeActivitiesService.createHomeActivity(createHomeActivityDto);
  }

  @Get()
  async getHomeActivities(@Query('user_id') userId: string) {
    return await this.homeActivitiesService.getHomeActivities(userId);
  }

  @Delete()
  async deleteHomeActivity(@Query('activity_id') activityId: string) {
    if (!activityId) {
      return {status: 'error', message: 'Activity ID is required'};
    }
    await this.homeActivitiesService.deleteHomeActivity(activityId);
    return {status: 'success', message: 'Home activity deleted successfully'};
  }
}
