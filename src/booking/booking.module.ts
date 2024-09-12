import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { UserModule } from 'src/user/user.module';
import { HelpersModule } from 'src/helpers/helpers.module';
import { VehicleTypeModule } from 'src/vehicle-type/vehicle-type.module';
import { BookingModel } from './model/booking.model';
import { PlaceModule } from 'src/place/place.module';
import { LogsModule } from 'src/logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    UserModule,
    HelpersModule,
    VehicleTypeModule,
    PlaceModule,
    LogsModule
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingModel
  ]
})
export class BookingModule {}
