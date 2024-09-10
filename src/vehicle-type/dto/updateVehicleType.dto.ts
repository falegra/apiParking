import { PartialType } from "@nestjs/mapped-types";
import { CreateVehicleTypeDto } from "./createVehicleType.dto";

export class UpdateVehicleTypeDto extends PartialType(CreateVehicleTypeDto) {}