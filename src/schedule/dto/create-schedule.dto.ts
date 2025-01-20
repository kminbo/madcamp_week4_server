import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateScheduleDto {
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    situation: string;

    @IsNotEmpty()
    @IsDate()
    due: Date;

    @IsString()
    tasks?: string;
}