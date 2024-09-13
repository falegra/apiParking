import { Injectable } from '@nestjs/common';
import { BookingModel } from './model/booking.model';
import { CreateBookingDto } from './dto/createBooking.dto';
import { Booking } from './entities/booking.entity';
import { Response } from 'express';
import { PlaceModel } from 'src/place/model/place.model';
import { Place } from 'src/place/entities/place.entity';
import { IActiveUser } from 'src/common/interfaces/activeUser.interface';
import { User } from 'src/user/entities/user.entity';
import { UserModel } from 'src/user/model/user.model';
import { Actions } from 'src/common/enum/actions.enum';
import { LogsModel } from 'src/logs/model/logs.model';

@Injectable()
export class BookingService {
    constructor(
        private readonly bookingModel: BookingModel,
        private readonly placeModel: PlaceModel,
        private readonly userModel: UserModel,
        private readonly logsModel: LogsModel
    ) {}

    async createBooking(
        {vehicleRegistration, vehicleType, startTime, endTime}: CreateBookingDto,
        {email}: IActiveUser,
        res: Response
    ) {
        startTime = `${Number(startTime) + (4*60*60*1000)}`;
        endTime = `${Number(endTime) + (4*60*60*1000)}`;

        try {
            const userDb: User = await this.userModel.getUserByEmail(email);

            const placesDb: Place[] = await this.placeModel.getAllPlaces();
            let places = [];

            for(let i = 0; i < placesDb.length ; i++) {
                const place = placesDb[i];
                const bookings: Booking[] = await this.bookingModel.getBookingsByPlace(place);
                let can = true;

                for(let j = 0; j < bookings.length ; j++) {
                    if(
                        Number(bookings[j].startTime) < Number(endTime)
                        && Number(bookings[j].endTime) > Number(startTime)
                    ) {
                        can = false;
                        break;
                    }
                }

                if (can) {
                    places.push({
                        place,
                        cant: bookings.length
                    });
                }
            }

            places.sort((a, b) => a.cant - b.cant);

            if(places.length === 0) return res.sendStatus(445);

            const bookingDb: Booking = await this.bookingModel.createBooking({
                vehicleRegistration,
                vehicleType,
                startTime,
                endTime
            }, places[0].place, userDb);

            this.createLog(userDb, bookingDb, Actions.RESERVED);

            return res.status(234).json({booking: bookingDb});
        } catch (error) {
            this.handleLog('createBooking', error);
            if(error.message === 'ER_DUP_ENTRY') return res.sendStatus(444);
            else return res.sendStatus(443);
        }
    }

    async cancelBooking(
        id: number,
        {email}: IActiveUser,
        res: Response
    ) {
        try {
            const userDb: User = await this.userModel.getUserByEmail(email);

            const bookingDb: Booking = await this.bookingModel.getBookingById(id);

            if(!bookingDb) return res.sendStatus(446);

            if(bookingDb.user.email !== email) return res.sendStatus(447);

            this.createLog(userDb, bookingDb, Actions.CANCELED);

            await this.bookingModel.deleteBooking(id);

            return res.sendStatus(235);
        } catch (error) {
            this.handleLog('cancelBooking', error);
            return res.sendStatus(448);
        }
    }

    async getAll(
        res: Response
    ) {
        try {
            const bookingsDb: Booking[] = await this.bookingModel.getAll();
            return res.status(236).json({bookings: bookingsDb});
        } catch (error) {
            this.handleLog('getAll', error);
            return res.sendStatus(449);
        }
    }

    async checkIn(
        id: number,
        { email }: IActiveUser,
        res: Response
    ) {
        try {
            const userDb: User = await this.userModel.getUserByEmail(email);

            const bookingDb: Booking = await this.bookingModel.getBookingById(id);

            if(!bookingDb) return res.sendStatus(446);

            this.createLog(userDb, bookingDb, Actions.VEHICLE_ENTRY);

            await this.bookingModel.updateBooking(id, {
                status: Actions.VEHICLE_ENTRY
            });

            return res.sendStatus(237);
        } catch (error) {
            this.handleLog('checkIn', error);
            return res.sendStatus(450);
        }
    }

    async checkOut(
        id: number,
        { email }: IActiveUser,
        res: Response
    ) {
        try {
            const userDb: User = await this.userModel.getUserByEmail(email);

            const bookingDb: Booking = await this.bookingModel.getBookingById(id);

            if(!bookingDb) return res.sendStatus(446);

            this.createLog(userDb, bookingDb, Actions.VEHICLE_EXIT);

            await this.bookingModel.deleteBooking(id);

            return res.sendStatus(238);
        } catch (error) {
            this.handleLog('checkOut', error);
            return res.sendStatus(451);
        }
    }









    handleLog(
        description: string,
        error: any
    ){
        console.log(`[ERROR] - ${description} - booking.service.ts`);
        console.log(error.message);
    }

    private createLog(
        user: User,
        bookingDb: Booking,
        action: Actions
    ) {
        try {
            this.logsModel.create({
                action,
                user: {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    username: user.username,
                    role: user.role
                },
                booking: {
                    id: bookingDb.id,
                    endDate: bookingDb.endDate,
                    endHours: bookingDb.endHour,
                    endTime: bookingDb.endTime,
                    place: bookingDb.place.id,
                    startDate: bookingDb.startDate,
                    startHours: bookingDb.startHour,
                    startTime: bookingDb.startTime,
                    vehicleRegistration: bookingDb.vehicleRegistration,
                    vehicleType: bookingDb.vehicleType.id,
                },
                createdAt: new Date().getTime() + ''
            });
        } catch (error) {
            this.handleLog('createLog', error);
            throw new Error(error.message);
        }
    }
}
