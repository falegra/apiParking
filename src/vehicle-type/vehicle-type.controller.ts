import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehicleTypeService } from './vehicle-type.service';
import { CreateVehicleTypeDto } from './dto/createVehicleType.dto';
import { Response } from 'express';
import { AdminGuard } from 'src/auth/admin.guard';
import { ClienteGuard } from 'src/auth/cliente.guard';
import { UpdateVehicleTypeDto } from './dto/updateVehicleType.dto';

@ApiTags('vehicle-type')
@Controller('vehicle-type')
export class VehicleTypeController {
    constructor(
        private readonly vehicleTypeService: VehicleTypeService
    ) {}

    @Post()
    @UseGuards(AdminGuard)
    @ApiResponse({status: 229, description: 'created vehicle type successfully'})
    @ApiResponse({status: 437, description: 'error creating the vehicle type'})
    createVehicleType(
        @Body() createVehicleType: CreateVehicleTypeDto,
        @Res() res: Response
    ) {
        return this.vehicleTypeService.createVehicleType(createVehicleType, res);
    }

    @Get()
    @UseGuards(ClienteGuard)
    @ApiResponse({status: 230, description: 'getting all vehicle types'})
    @ApiResponse({status: 438, description: 'error getting all vehicle types'})
    getAll(
        @Res() res: Response
    ) {
        return this.vehicleTypeService.getAll(res);
    }

    @Get('/:id')
    @UseGuards(ClienteGuard)
    @ApiResponse({status: 231, description: 'getting the vehicle type by id'})
    @ApiResponse({status: 439, description: 'vehicle type not found'})
    @ApiResponse({status: 440, description: 'error getting the vehicle type'})
    getOneById(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response
    ) {
        return this.vehicleTypeService.getOneById(id, res);
    }

    @Put('/:id')
    @UseGuards(AdminGuard)
    @ApiResponse({status: 439, description: 'vehicle type not found'})
    @ApiResponse({status: 441, description: 'error updating the vehicle type'})
    @ApiResponse({status: 232, description: 'updated vehicle type successfully'})
    updateVehicleType(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateVehicleType: UpdateVehicleTypeDto,
        @Res() res: Response
    ) {
        return this.vehicleTypeService.updateVehicleType(id, updateVehicleType, res);
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    @ApiResponse({status: 439, description: 'vehicle type not found'})
    @ApiResponse({status: 442, description: 'error deleting the vehicle type'})
    @ApiResponse({status: 233, description: 'deleted vehicle type successfully'})
    deleteVehicleType(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response
    ) {
        return this.vehicleTypeService.deleteVehicleType(id, res);
    }
}
