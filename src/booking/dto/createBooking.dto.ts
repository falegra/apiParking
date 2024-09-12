import { IsDefined, IsInt, IsString, Length } from "class-validator";

export class CreateBookingDto {
    @IsDefined()
    @IsString()
    @Length(7, 7)
    vehicleRegistration: string;

    @IsDefined()
    @IsInt()
    vehicleType: number;

    @IsDefined()
    @IsString()
    startTime: string;

    @IsDefined()
    @IsString()
    endTime: string;
}