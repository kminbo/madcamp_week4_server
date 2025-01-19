import { Module } from '@nestjs/common';
import { HomeActivitiesService } from './home-activities.service';
import { HomeActivitiesController } from './home-activities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeActivities, HomeActivitiesSchema } from './schemas/home-activity.schema';
import { User, UserSchema } from '../auth/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: HomeActivities.name, schema: HomeActivitiesSchema},
      {name: User.name, schema: UserSchema}
    ])
  ],
  controllers: [HomeActivitiesController],
  providers: [HomeActivitiesService],
})
export class HomeActivitiesModule {}
