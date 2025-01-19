import { IsNotEmpty, IsString } from "class-validator";

export class CreateHomeActivityDto {
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    activity: string;
}