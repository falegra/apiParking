import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "../entities/booking.entity";
import { CreateBookingDto } from "../dto/createBooking.dto";
import { VehicleTypeModel } from "src/vehicle-type/model/vehicleType.model";
import { VehicleType } from "src/vehicle-type/entities/vehicleType.entity";
import { Place } from "src/place/entities/place.entity";
import { Actions } from "src/common/enum/actions.enum";
import { User } from "src/user/entities/user.entity";
import { UpdateBookingDto } from "../dto/updateBooking.dto";

@Injectable()
export class BookingModel {
    constructor(
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
        private readonly vehicleTypeModel: VehicleTypeModel
    ) {}

    async createBooking(
        {vehicleRegistration, vehicleType, startTime, endTime}: CreateBookingDto,
        place: Place,
        user: User
    ) {
        try {
            const start = new Date(Number(startTime));
            const end = new Date(Number(endTime));

            const vehicleTypeDb: VehicleType = await this.vehicleTypeModel.getOneById(vehicleType);

            if(!vehicleTypeDb) {
                throw new Error('vehicle type not found');
            }

            const booking: Booking = await this.bookingRepository.save(this.bookingRepository.create({
                vehicleRegistration,
                vehicleType: vehicleTypeDb,
                startTime,
                endTime,
                startDate: `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`,
                startHour: `${start.getHours()}:${start.getMinutes()}`,
                endDate: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`,
                endHour: `${end.getHours()}:${end.getMinutes()}`,
                status: Actions.RESERVED,
                place,
                user
            }));

            return booking;
        } catch (error) {
            this.handleLog('createBooking', error);
            if(error.code === 'ER_DUP_ENTRY') throw new Error('ER_DUP_ENTRY');
            else throw new Error(error.code);
        }
    }

    async getBookingsByPlace(
        place: Place
    ) {
        try {
            const bookings: Booking[] = await this.bookingRepository.find({
                where: {
                    place
                }
            });

            return bookings;
        } catch (error) {
            this.handleLog('getBookingsByPlace', error);
            throw new Error(error.message);
        }
    }

    async getBookingById(
        id: number
    ) {
        try {
            const booking: Booking = await this.bookingRepository.findOne({
                where: {
                    id
                }
            });

            delete booking.user.password;
            delete booking.user.createdAt;
            delete booking.user.verificationCode;

            return booking;
        } catch (error) {
            this.handleLog('getBookingById', error);
            throw new Error(error.message);
        }
    }

    async deleteBooking(
        id: number
    ) {
        try {
            await this.bookingRepository.delete(id);
            return true;
        } catch (error) {
            this.handleLog('deleteBooking', error);
            throw new Error(error.message);
        }
    }

    async getAll() {
        try {
            const bookingsDb: Booking[] = await this.bookingRepository.find();

            bookingsDb.forEach(booking => {
                delete booking.user.password;
                delete booking.user.createdAt;
                delete booking.user.verificationCode;
            });

            return bookingsDb;
        } catch (error) {
            this.handleLog('getAll', error);
            throw new Error(error.message);
        }
    }

    async updateBooking(
        id: number,
        {vehicleType, ...updateBooking}: UpdateBookingDto
    ) {
        try {
            let vehicleTypeDb: VehicleType = undefined;

            if(vehicleType) {
                vehicleTypeDb = await this.vehicleTypeModel.getOneById(vehicleType);
            }

            await this.bookingRepository.update(id, {
                vehicleType: vehicleTypeDb,
                ...updateBooking
            });

            return true;
        } catch (error) {
            this.handleLog('updateBooking', error);
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