import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/createPlace.dto';
import { AdminGuard } from 'src/auth/admin.guard';
import { Response } from 'express';
import { ClienteGuard } from 'src/auth/cliente.guard';

@ApiTags('place')
@ApiBearerAuth()
@Controller('place')
export class PlaceController {
    constructor(
        private readonly placeService: PlaceService
    ) {}

    @Post()
    @UseGuards(AdminGuard)
    @ApiResponse({status: 225, description: 'created place successfully'})
    @ApiResponse({status: 432, description: 'error creating the place'})
    createPlace(
        @Body() createPlace: CreatePlaceDto,
        @Res() res: Response
    ) {
        return this.placeService.createPlace(createPlace, res);
    }

    @Get()
    @UseGuards(ClienteGuard)
    @ApiResponse({status: 226, description: 'getting all places'})
    @ApiResponse({status: 433, description: 'error getting all places'})
    getAll(
        @Res() res: Response
    ) {
        return this.placeService.getAll(res);
    }

    @Get('/:id')
    @UseGuards(ClienteGuard)
    @ApiResponse({status: 227, description: 'getting the place'})
    @ApiResponse({status: 434, description: 'error getting the place'})
    getOne(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response
    ) {
        return this.placeService.getOne(id, res);
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    deletePlace(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response
    ) {
        return this.placeService.deletePlace(id, res);
    }
}
