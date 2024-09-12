import { IsDefined, IsString } from "class-validator";

export class CreateLogDto {
    @IsDefined()
    @IsString()
    action: string;

    @IsDefined()
    user: {
        id: number,
        name: string,
        lastName: string,
        username: string
        email: string,
        phone: string,
        role: string
    }

    @IsDefined()
    booking: {
        id: number,
        startTime: string,
        endTime: string,
        place: number,
        vehicleRegistration: string,
        vehicleType: number,
        startDate: string,
        startHours: string,
        endDate: string,
        endHours: string
    }

    @IsDefined()
    @IsString()
    createdAt: string;
}