import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return await this.scheduleService.createSchedule(createScheduleDto);
  }

  @Get()
  async getSchedules(@Query('user_id') userId: string) {
    return await this.scheduleService.getSchedules(userId);
  }

  @Get('detail')
  async getScheduleDetail(@Query('schedule_id') scheduleId: string) {
    return await this.scheduleService.getScheduleDetail(scheduleId);
  }
  
  @Get('situations')
  async getSituations(@Query('user_id') userId: string) {
    return await this.scheduleService.getSituations(userId);
  }


}