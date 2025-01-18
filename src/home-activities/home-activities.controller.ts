import { Controller } from '@nestjs/common';
import { HomeActivitiesService } from './home-activities.service';

@Controller('home-activities')
export class HomeActivitiesController {
  constructor(private readonly homeActivitiesService: HomeActivitiesService) {}
}
