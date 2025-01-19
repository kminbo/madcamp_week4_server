import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateScheduleDto {
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    situation: string;

    @IsNotEmpty()
    @IsDateString()
    due: string;

    @IsString()
    tasks?: string;
}