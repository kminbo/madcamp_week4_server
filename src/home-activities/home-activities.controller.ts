import { Controller, Post, Body, Get, Query } from '@nestjs/common';
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
}
