import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersModule } from './helpers/helpers.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { PlaceModule } from './place/place.module';
import { Place } from './place/entities/place.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entities/booking.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        User,
        Place,
        Booking
      ],
      synchronize: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/api_parking'),
    HelpersModule,
    UserModule,
    AuthModule,
    PlaceModule,
    BookingModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
