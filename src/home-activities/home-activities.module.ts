import { Module } from '@nestjs/common';
import { HomeActivitiesService } from './home-activities.service';
import { HomeActivitiesController } from './home-activities.controller';

@Module({
  controllers: [HomeActivitiesController],
  providers: [HomeActivitiesService],
})
export class HomeActivitiesModule {}
