import { IsDefined, IsString, Length } from "class-validator";

export class CreateBookingDto {
    @IsDefined()
    @IsString()
    @Length(7, 7)
    vehcileRegistration: string;

    @IsDefined()
    vehicleType: string;
    startTime: string;
    endTime: string;
}