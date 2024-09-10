import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VehicleType } from "../entities/vehicleType.entity";
import { CreateVehicleTypeDto } from "../dto/createVehicleType.dto";
import { UpdateVehicleTypeDto } from "../dto/updateVehicleType.dto";

@Injectable()
export class VehicleTypeModel {
    constructor(
        @InjectRepository(VehicleType) private readonly vehicleTypeRepository: Repository<VehicleType>
    ) {}

    async createVehicleType(
        {type}: CreateVehicleTypeDto
    ) {
        try {
            const savedVehicleType: VehicleType = await this.vehicleTypeRepository.save(this.vehicleTypeRepository.create({
                type
            }));

            return savedVehicleType;
        } catch (error) {
            this.handleLog('createVehicleType', error);
            throw new Error(error.message);
        }
    }

    async getAllVehicleTypes() {
        try {
            const vehicleTypesDb: VehicleType[] = await this.vehicleTypeRepository.find();
            return vehicleTypesDb;
        } catch (error) {
            this.handleLog('getAllVehicleTypes', error);
            throw new Error(error.message);
        }
    }

    async getOneById(
        id: number
    ) {
        try {
            const vehicleTypeDb: VehicleType = await this.vehicleTypeRepository.findOne({
                where: {
                    id
                }
            });
            return vehicleTypeDb;
        } catch (error) {
            this.handleLog('getOneById', error);
            throw new Error(error.message);
        }
    }

    async deleteVehicleType(
        id: number
    ) {
        try {
            await this.vehicleTypeRepository.delete(id);
            return true;
        } catch (error) {
            this.handleLog('deleteVehicleType', error);
            throw new Error(error.message);
        }
    }

    async updateVehicleType(
        id: number,
        updateVehicleType: UpdateVehicleTypeDto
    ) {
        try {
            const updatedVehicleType = await this.vehicleTypeRepository.update(id, updateVehicleType);

            return updatedVehicleType;
        } catch (error) {
            this.handleLog('updateVehicleType', error);
            throw new Error(error.message);
        }
    }







    private handleLog(
        description: string,
        error: any
    ) {
        console.log(`[ERROR] - ${description} - user.model.ts`);
        console.log(error.message);
    }
}