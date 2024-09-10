import { Injectable } from '@nestjs/common';
import { VehicleTypeModel } from './model/vehicleType.model';
import { CreateVehicleTypeDto } from './dto/createVehicleType.dto';
import { Response } from 'express';
import { VehicleType } from './entities/vehicleType.entity';
import { UpdateVehicleTypeDto } from './dto/updateVehicleType.dto';

@Injectable()
export class VehicleTypeService {
    constructor(
        private readonly vehicleTypeModel: VehicleTypeModel
    ) {}

    async createVehicleType(
        {type}: CreateVehicleTypeDto,
        res: Response
    ) {
        try {
            const savedVehicleType: VehicleType = await this.vehicleTypeModel.createVehicleType({type});

            return res.status(229).json({vehicleType: savedVehicleType});
        } catch (error) {
            this.handleLog('createVehicleType', error);
            return res.sendStatus(437);
        }
    }

    async getAll(
        res: Response
    ) {
        try {
            const vehicleTypesDb: VehicleType[] = await this.vehicleTypeModel.getAllVehicleTypes();

            return res.status(230).json({vehicleTypes: vehicleTypesDb});
        } catch (error) {
            this.handleLog('getAll', error);
            return res.sendStatus(438);
        }
    }

    async getOneById(
        id: number,
        res: Response
    ) {
        try {
            const vehicleTypeDb: VehicleType = await this.vehicleTypeModel.getOneById(id);

            if(!vehicleTypeDb) {
                return res.sendStatus(439);
            }

            return res.status(231).json({vehicleType: vehicleTypeDb});
        } catch (error) {
            this.handleLog('getOneById', error);
            return res.sendStatus(440);
        }
    }

    async updateVehicleType(
        id: number,
        updateVehicleType: UpdateVehicleTypeDto,
        res: Response
    ) {
        try {
            const vehicleTypeDb: VehicleType = await this.vehicleTypeModel.getOneById(id);

            if(!vehicleTypeDb) {
                return res.sendStatus(439);
            }

            await this.vehicleTypeModel.updateVehicleType(id, updateVehicleType);

            return res.sendStatus(232);
        } catch (error) {
            this.handleLog('updateVehicleType', error);
            return res.sendStatus(441);
        }
    }

    async deleteVehicleType(
        id: number,
        res: Response
    ) {
        try {
            const vehicleTypeDb: VehicleType = await this.vehicleTypeModel.getOneById(id);

            if(!vehicleTypeDb) {
                return res.sendStatus(439);
            }

            await this.vehicleTypeModel.deleteVehicleType(id);

            return res.sendStatus(233);
        } catch (error) {
            this.handleLog('deleteVehicleType', error);
            return res.sendStatus(442);
        }
    }







    handleLog(
        description: string,
        error: any
    ){
        console.log(`[ERROR] - ${description} - auth.service.ts`);
        console.log(error.message);
    }
}
