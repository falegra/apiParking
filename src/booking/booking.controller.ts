import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Response } from 'express';
import { ClienteGuard } from 'src/auth/cliente.guard';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { IActiveUser } from 'src/common/interfaces/activeUser.interface';
import { EmpleadoGuard } from 'src/auth/empleado.guard';

@ApiTags('booking')
@ApiBearerAuth()
@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService
    ) {}

    @Post()
    @UseGuards(ClienteGuard)
    @ApiResponse({status: 445, description: 'there is no availability'})
    @ApiResponse({status: 443, description: 'error creating the booking'})
    @ApiResponse({status: 234, description: 'created booking successfully'})
    createBooking(
        @Body() createBooking: CreateBookingDto,
        @ActiveUser() activeUser: IActiveUser,
        @Res() res: Response
    ) {
        return this.bookingService.createBooking(createBooking, activeUser, res);
    }

    @Delete('/:id')
    @UseGuards(ClienteGuard)
    @ApiResponse({status: 446, description: 'booking not found'})
    @ApiResponse({status: 447, description: 'this booking is not yours'})
    @ApiResponse({status: 448, description: 'error cancelling the booking'})
    @ApiResponse({status: 235, description: 'canceled booking successfully'})
    cancelBooking(
        @Param('id', ParseIntPipe) id: number,
        @ActiveUser() activeUser: IActiveUser,
        @Res() res: Response
    ) {
        return this.bookingService.cancelBooking(id, activeUser, res);
    }

    @Get()
    @UseGuards(EmpleadoGuard)
    @ApiResponse({status: 236, description: 'getting all bookings with empleado role'})
    @ApiResponse({status: 449, description: 'error getting all bookings'})
    getAll(
        @Res() res: Response
    ) {
        return this.bookingService.getAll(res);
    }

    @Get('/checkIn/:id')
    @UseGuards(EmpleadoGuard)
    @ApiResponse({status: 237, description: 'check in booking successfully'})
    @ApiResponse({status: 446, description: 'booking not found'})
    @ApiResponse({status: 450, description: 'error check in booking'})
    checkIn(
        @Param('id', ParseIntPipe) id: number,
        @ActiveUser() activeUser: IActiveUser,
        @Res() res: Response
    ) {
        return this.bookingService.checkIn(id, activeUser, res);
    }

    @Get('/checkOut/:id')
    @UseGuards(EmpleadoGuard)
    @ApiResponse({status: 446, description: 'booking not found'})
    @ApiResponse({status: 451, description: 'error check out booking'})
    @ApiResponse({status: 238, description: 'check out booking successfully'})
    checkOut(
        @Param('id', ParseIntPipe) id: number,
        @ActiveUser() activeUser: IActiveUser,
        @Res() res: Response
    ) {
        return this.bookingService.checkOut(id, activeUser, res);
    }
}
