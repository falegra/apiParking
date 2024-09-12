import { IsDefined, IsString } from "class-validator";

export class CreateVehicleTypeDto {
    @IsDefined()
    @IsString()
    type: string;
}